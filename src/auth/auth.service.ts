import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/shared';
import { AuthenticateDto } from './dto';
import { loginError } from './auth.errors';
import { UserService } from 'src/user/user.service';

const { JWT_SECRET } = process.env;
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async register({ name, password }: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return this.userService.createOne({ name, password: hashedPassword });
  }

  async login({ name, password }: AuthenticateDto) {
    const user = await this.userService.findByName(name);
    if (!user) throw loginError;
    const result = await bcrypt.compare(password, user.password);
    if (!result) throw loginError;
    return {
      accessToken: this.jwtService.sign(
        { name, id: user.id },
        { secret: JWT_SECRET },
      ),
      name,
      id: user.id,
    };
  }

  async whoAmI(token: string) {
    const newToken = token.slice(7);
    const {
      payload: { name, id },
    }: any = this.jwtService.decode(newToken, { complete: true });
    return { name, id };
  }

  async getUserByToken(token: string) {
    const {
      payload: { name },
    }: any = this.jwtService.decode(token, { complete: true });
    const user = await this.userService.findByName(name);
    return user;
  }
}
