import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { paths } from './constants';

@Controller(paths.root)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(paths.all)
  async getUsers() {
    return await this.userService.findAll();
  }
}
