import { IsBoolean, IsNotEmpty } from 'class-validator';

export class QueryLogoutDto {
  @IsNotEmpty({ message: 'emptry' })
  @IsBoolean({ message: 'Boolean' })
  all: boolean;
}
