import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, AuthModule, MessagesModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
