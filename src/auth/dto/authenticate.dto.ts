import { IsNotEmpty, IsString, Min } from 'class-validator';

export class AuthenticateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
