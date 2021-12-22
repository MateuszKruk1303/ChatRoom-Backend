import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { promisify } from 'util';
import { AUTH_REPOSITORY } from './constants';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities';
import * as bcrypt from 'bcrypt';
import { AuthenticateDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { loginError } from './auth.errors';
@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private authRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register({ name, password }: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User();
    user.name = name;
    user.password = hashedPassword;
    return await this.authRepository.save(user);
  }

  async login({ name, password }: AuthenticateDto) {
    const user = await this.authRepository.findOne({ name });
    if (!user) throw loginError;
    const result = await bcrypt.compare(password, user.password);
    if (!result) throw loginError;
    return {
      accessToken: this.jwtService.sign({ name }),
    };
  }

  async findAll() {
    return await this.authRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
