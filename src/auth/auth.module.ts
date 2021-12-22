import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { authProviders } from './auth.providers';
import { JwtStrategy } from './jwt';
import { PassportModule } from '@nestjs/passport';

const { JWT_SECRET: secret, JWT_EXPIRES: expiresIn } = process.env;
@Module({
  imports: [
    JwtModule.register({ secret, signOptions: { expiresIn } }),
    DatabaseModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [...authProviders, AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
