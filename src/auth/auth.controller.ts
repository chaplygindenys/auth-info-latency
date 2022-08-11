import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { Message } from './auth-message';
import { AuthService } from './auth.service';
import { GetCurrentUserId, Public } from './decorators';
import { AuthDto, QueryLogoutDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async singup(@Body() dto: AuthDto): Promise<string> {
    await this.authService.singup(dto);
    return Message.AUTH_MESSAGE;
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: AuthDto): Promise<string> {
    const user = await this.authService.signin(dto);
    if (user === null) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Query() params: QueryLogoutDto,
    @GetCurrentUserId() userId: string,
  ) {
    if (params.all) {
      await this.authService.logoutAll();
    } else {
      await this.authService.logoutById(userId);
    }
  }
}
