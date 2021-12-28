import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/shared';
import { Repository } from 'typeorm';
import { USER_REPOSITORY } from './constants';
import { User } from './entities';
import { userExistsError } from './user.errors';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) {}

  async createOne({ name, password }: CreateUserDto) {
    const user = new User();
    const dbUser = await this.userRepository.findOne({ name });
    if (dbUser) throw userExistsError;
    user.name = name;
    user.password = password;
    return await this.userRepository.save(user);
  }

  async findByName(name: string) {
    return await this.userRepository.findOne({ name });
  }

  async findAll() {
    const result = await this.userRepository.find();
    const response = result.map(({ name, id }) => ({
      id,
      name,
    }));
    return response;
  }
}
