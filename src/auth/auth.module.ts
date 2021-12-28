import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/database/database.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt-utils';
import { UserModule } from 'src/user/user.module';

const { JWT_SECRET: secret, JWT_EXPIRES: expiresIn } = process.env;

@Module({
  imports: [
    JwtModule.register({ secret, signOptions: { expiresIn } }),
    PassportModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
