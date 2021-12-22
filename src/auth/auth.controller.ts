import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, AuthenticateDto } from './dto';
import { JwtAuthGuard } from './jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('/login')
  login(@Body() authenticateDto: AuthenticateDto) {
    return this.authService.login(authenticateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  findAll() {
    return this.authService.findAll();
  }
}
