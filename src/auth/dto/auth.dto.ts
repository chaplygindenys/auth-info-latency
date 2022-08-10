import {
  isEmail,
  isMobilePhone,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';

export class AuthDto {
  @IsNotEmpty({ message: 'emptry' })
  @IsString({ message: 'string' })
  @ValidateIf(
    (obj: AuthDto) =>
      isEmail(obj.id) || isMobilePhone(obj.id, process.env.LOCATE),
    {
      message: 'pho',
    },
  )
  id: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
