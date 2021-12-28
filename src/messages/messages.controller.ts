import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-utils';
import { paths } from './constants';
import { MessagesService } from './messages.service';

@Controller(paths.root)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async getAllMessages(
    @Body() { fromId, toId }: { fromId: number; toId: number },
  ) {
    return this.messagesService.getAllMessages(fromId, toId);
  }
}
