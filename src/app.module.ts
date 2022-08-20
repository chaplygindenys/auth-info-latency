import 'dotenv/config';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TokGuard } from './auth/guards';
import { InfoModule } from './info/info.module';
import { PrismaModule } from './prisma/prisma.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    InfoModule,
    PrismaModule,
    MongooseModule.forRoot(process.env.MONGOOSE_DATABASE_URL),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: TokGuard,
    },
  ],
})
export class AppModule {}
