import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { authProviders } from './auth.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [...authProviders, AuthService],
})
export class AuthModule {}
