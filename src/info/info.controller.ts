import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import 'dotenv/config';
import { GetCurrentUserId } from 'src/auth/decorators';
import { InfoService } from './info.service';

@Controller()
export class InfoController {
  constructor(private infoService: InfoService) {}

  @Get('info')
  @HttpCode(HttpStatus.OK)
  async info(@GetCurrentUserId() userId: string): Promise<UserIdInfo> {
    const UserInfo = await this.infoService.infoById(userId);
    return UserInfo;
  }

  @Get('latency')
  @HttpCode(HttpStatus.OK)
  async lacety(): Promise<string> {
    const latencyInfo = await this.infoService.latencyInfo();
    if (!latencyInfo) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return latencyInfo;
  }
}
