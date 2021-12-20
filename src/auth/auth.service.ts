import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AUTH_REPOSITORY } from './constants';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private authRepository: Repository<User>,
  ) {}

  async create({ name, password }: CreateUserDto) {
    const user = new User();
    user.name = name;
    user.password = password;
    return await this.authRepository.save(user);
  }

  findAll() {
    return this.authRepository.find();
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
