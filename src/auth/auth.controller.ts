import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { CreateUserDto } from 'src/shared';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto';
import { paths } from './constants';
import { JwtAuthGuard } from './jwt-utils';

@Controller(paths.root)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(paths.register)
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post(paths.login)
  login(@Body() authenticateDto: AuthenticateDto) {
    return this.authService.login(authenticateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(paths.me)
  whoAmI(@Headers('Authorization') token: string) {
    return this.authService.whoAmI(token);
  }
}
