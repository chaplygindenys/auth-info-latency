import { IsNotEmpty, IsString } from 'class-validator';
import { Message } from '../auth-message';

export class AuthDto {
  @IsString({
    message: Message.MESSAGE_BAD_REQUEST,
  })
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
