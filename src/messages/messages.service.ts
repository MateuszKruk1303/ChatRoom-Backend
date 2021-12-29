import { Inject, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { MESSAGES_REPOSITORY } from './constants';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities';
import { getMessagesQuery } from './queries';
import { SocketUser } from './types';

@Injectable()
export class MessagesService {
  constructor(
    @Inject(MESSAGES_REPOSITORY)
    private messagesRepository: Repository<Message>,
  ) {}

  async create({ fromId, toId, text }: CreateMessageDto) {
    const message = new Message();
    message.from = fromId;
    message.to = toId;
    message.text = text;
    const { id } = await this.messagesRepository.save(message);
    return { id, fromId, toId, text };
  }

  async getAllMessages(from: number, to: number) {
    const result = await this.messagesRepository.query(
      getMessagesQuery(from, to),
    );
    return result;
  }

  extractConnectedUsersData(data: Map<string, Socket>): SocketUser[] {
    const result = Array.from(data.values()).map((item) => {
      const socketId = item.id;
      const userId = item.handshake.url.split('&')[1].split('=')[1];
      return {
        socketId,
        userId: parseInt(userId),
      };
    });

    return result;
  }
}
