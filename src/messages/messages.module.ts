import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { messageProviders } from './messages.providers';
import { DatabaseModule } from 'src/database/database.module';
import { MessagesController } from './messages.controller';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [MessagesController],
  providers: [...messageProviders, MessagesGateway, MessagesService],
})
export class MessagesModule {}
