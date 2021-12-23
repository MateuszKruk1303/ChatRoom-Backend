import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt';
import { AUTH_REPOSITORY } from './constants';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities';
import { AuthenticateDto } from './dto';
import { loginError, userExistsError } from './auth.errors';

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
    const dbUser = await this.authRepository.findOne({ name });
    if (dbUser) throw userExistsError;
    user.name = name;
    user.password = hashedPassword;
    const response = await this.authRepository.save(user);

    return response;
  }

  async login({ name, password }: AuthenticateDto) {
    const user = await this.authRepository.findOne({ name });
    if (!user) throw loginError;
    const result = await bcrypt.compare(password, user.password);
    if (!result) throw loginError;
    return {
      accessToken: this.jwtService.sign({ name }),
      name,
      id: user.id,
    };
  }

  async findAll() {
    return await this.authRepository.find();
  }
}
