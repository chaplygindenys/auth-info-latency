import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import 'dotenv/config';
import { Message } from './auth-message';
import { AuthService } from './auth.service';
import { GetCurrentUserId, Public } from './decorators';
import { AuthDto, QueryLogoutDto } from './dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async singup(@Body() dto: AuthDto): Promise<string> {
    const resalt = await this.authService.singup(dto);

    if (resalt === process.env.FORBIDDEN) {
      throw new HttpException(Message.MESSAGE_FORBIDDEN, HttpStatus.FORBIDDEN);
    }

    if (resalt === process.env.BAD_REQUEST) {
      throw new HttpException(
        Message.MESSAGE_BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }
    return Message.AUTH_MESSAGE;
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: AuthDto): Promise<Token> {
    const resalt = await this.authService.signin(dto);
    if (resalt === process.env.BAD_REQUEST) {
      throw new HttpException(
        Message.MESSAGE_BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (resalt === process.env.FORBIDDEN) {
      throw new HttpException(Message.MESSAGE_FORBIDDEN, HttpStatus.FORBIDDEN);
    }
    return { token: resalt };
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Query() params: QueryLogoutDto,
    @GetCurrentUserId() userId: string,
  ) {
    if (params.all === 'true') {
      await this.authService.logoutAll();

      return Message.LOGOUT_ALL;
    } else if (params.all === 'false') {
      await this.authService.logoutById(userId);

      return Message.LOGOUT_BY_ID;
    } else {
      throw new HttpException(
        Message.MESSAGE_BAD_QUERY,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
