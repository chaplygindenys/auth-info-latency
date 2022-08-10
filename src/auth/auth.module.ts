import { Module } from '@nestjs/common';
import { InfoService } from './info/info.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [InfoService, AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
