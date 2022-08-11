import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TokenStrategy } from './strategies';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  providers: [AuthService, TokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
