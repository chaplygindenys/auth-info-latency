import 'dotenv/config';
import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { isEmail, isMobilePhone } from 'class-validator';
import { Message } from './auth-message';
import * as argon from 'argon2';
import { show } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async validateTypeId(id: string): Promise<string> {
    if (isEmail(id)) return 'email';
    if (isMobilePhone(id)) return 'phone';
    return null;
  }

  async singup(dto: AuthDto): Promise<Tokens | string> {
    try {
      const type: string = await this.validateTypeId(dto.id);
      if (!type) return process.env.BAD_REQUEST;

      const user = await this.prisma.user.findFirst({
        where: { id: dto.id },
      });
      if (user) return process.env.FORBIDDEN;

      const hashPsw = await this.hashData(dto.password);

      const newUser = {
        id: dto.id,
        hashPsw,
        id_type: type,
        version: 1,
        createdAt: +Date.now(),
        updatedAt: +Date.now(),
      };
      const resaltPrisma = await this.prisma.user.create({
        data: newUser,
      });
      const createdUser = new this.userModel(newUser);
      const resaltMongoose = await createdUser.save();
      show(resaltMongoose);
      show(resaltPrisma);
      return Message.AUTH_MESSAGE;
    } catch (error) {
      console.log(error);
      return process.env.INTERNAL_SERVER_ERROR;
    }
  }

  async signin(dto: AuthDto): Promise<Tokens | string> {
    try {
      const type: string = await this.validateTypeId(dto.id);
      if (!type) return process.env.BAD_REQUEST;

      const user = await this.prisma.user.findUnique({
        where: { id: dto.id },
      });
      if (!user) return process.env.FORBIDDEN;

      const passwordMatches = await bcrypt.compare(dto.password, user.hashPsw);
      if (!passwordMatches) return process.env.FORBIDDEN;

      const tokens = await this.getTokens(user.id);

      await this.updateHashRefreshToken(user.id, tokens.refreshToken);

      return tokens;
    } catch (error) {
      console.log(error);
      if (error.message === process.env.FORBIDDEN) return process.env.FORBIDDEN;
      return process.env.INTERNAL_SERVER_ERROR;
    }
  }

  async logoutAll() {
    await this.prisma.user.updateMany({
      where: {
        hashRefreshToken: {
          not: null,
        },
      },
      data: {
        hashRefreshToken: null,
      },
    });
  }

  async logoutById(userId: string) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashRefreshToken: {
          not: null,
        },
      },
      data: {
        hashRefreshToken: null,
      },
    });
  }

  async refreshTokens(userId: string, refTok: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user || !user.hashRefreshToken) return process.env.FORBIDDEN;

      const refTokMatches = await argon.verify(user.hashRefreshToken, refTok);
      if (!refTokMatches) return process.env.FORBIDDEN;

      const tokens = await this.getTokens(user.id);
      await this.updateHashRefreshToken(user.id, tokens.refreshToken);

      return tokens;
    } catch (error) {
      console.log(error);
      return process.env.INTERNAL_SERVER_ERROR;
    }
  }

  async hashData(data: string) {
    const salt: number = +process.env.CRYPT_SALT;
    return await bcrypt.hash(data, salt);
  }

  async hashRefreshToken(token: string) {
    return await argon.hash(token);
  }

  async updateHashRefreshToken(userId: string, token: string) {
    const hash = await this.hashRefreshToken(token);
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        hashRefreshToken: hash,
      },
    });
  }

  async getTokens(userId: string): Promise<Tokens> {
    const [accTok, refTok] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
        },
        {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
        },
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        },
      ),
    ]);
    return {
      accessToken: accTok,
      refreshToken: refTok,
    };
  }
}
