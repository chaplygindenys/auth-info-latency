import { IsNotEmpty, IsString } from 'class-validator';
import { Message } from '../auth-message';

export class QueryLogoutDto {
  @IsNotEmpty()
  @IsString({ message: Message.MESSAGE_BAD_QUERY })
  all: string;
}
