import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { isEmail, isMobilePhone } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async validateTypeId(id: string): Promise<string> {
    if (isEmail(id)) return 'email';
    if (isMobilePhone(id)) return 'phone';
    return null;
  }

  async singup(dto: AuthDto): Promise<string> {
    try {
      const type: string = await this.validateTypeId(dto.id);
      if (!type) return process.env.BAD_REQUEST;

      const user = await this.prisma.user.findUnique({
        where: { id: dto.id },
      });
      if (user) return process.env.FORBIDDEN;

      const hashPsw = await this.hashData(dto.password);
      const newUser = await this.prisma.user.create({
        data: {
          id: dto.id,
          hashPsw,
          id_type: type,
          version: 1,
          createdAt: +Date.now(),
          updatedAt: +Date.now(),
        },
      });

      const token = await this.getToken(newUser.id);
      await this.updateHashToken(newUser.id, token);
      return token;
    } catch (error) {}
  }

  async signin(dto: AuthDto): Promise<string> {
    try {
      const type: string = await this.validateTypeId(dto.id);
      if (!type) return process.env.BAD_REQUEST;

      const user = await this.prisma.user.findUnique({
        where: { id: dto.id },
      });
      if (!user) return process.env.FORBIDDEN;

      const passwordMatches = await bcrypt.compare(dto.password, user.hashPsw);
      if (!passwordMatches) return process.env.FORBIDDEN;

      const token = await this.getToken(user.id);
      await this.updateHashToken(user.id, token);
      return token;
    } catch (error) {
      if (error.message === process.env.FORBIDDEN) return process.env.FORBIDDEN;
      return null;
    }
  }

  async logoutAll() {
    await this.prisma.user.updateMany({
      where: {
        hashToken: {
          not: null,
        },
      },
      data: {
        hashToken: null,
      },
    });
  }

  async logoutById(userId: string) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashToken: {
          not: null,
        },
      },
      data: {
        hashToken: null,
      },
    });
  }

  async hashData(data: string) {
    const salt: number = +process.env.CRYPT_SALT;
    return await bcrypt.hash(data, salt);
  }

  async updateHashToken(userId: string, token: string) {
    const hash = await this.hashData(token);
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        hashToken: hash,
      },
    });
  }

  async getToken(userId: string): Promise<string> {
    const token = await this.jwtService.signAsync(
      {
        id: userId,
      },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      },
    );
    return token;
  }
}
