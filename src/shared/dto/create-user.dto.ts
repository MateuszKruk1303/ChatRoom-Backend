import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 50)
  password: string;
}
