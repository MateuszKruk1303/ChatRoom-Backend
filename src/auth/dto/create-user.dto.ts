import { IsNotEmpty, IsString, Length, Min } from 'class-validator';
import { BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

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
