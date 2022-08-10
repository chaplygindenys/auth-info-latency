import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async singup(dto: AuthDto): Promise<string> {
    try {
      const hashPsw = await this.hashData(dto.password);
      const newUser = await this.prisma.user.create({
        data: {
          id: dto.id,
          hashPsw,
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
      const user = await this.prisma.user.findUnique({
        where: { id: dto.id },
      });
      if (!user) throw 403;

      const passwordMatches = await bcrypt.compare(dto.password, user.hashPsw);
      if (!passwordMatches) throw 403;

      const token = await this.getToken(user.id);
      await this.updateHashToken(user.id, token);
      return token;
    } catch (error) {
      if (error.message === 403) return null;
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
