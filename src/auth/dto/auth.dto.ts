import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsString({ message: 'pho' })
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
