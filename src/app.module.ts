import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { InfoModule } from './info/info.module';

@Module({
  imports: [AuthModule, InfoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
