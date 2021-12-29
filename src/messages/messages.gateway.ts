import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';
import { messages } from './constants';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({ cors: true })
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly messagesService: MessagesService,
    private readonly authService: AuthService,
  ) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage(messages.message)
  async addMessage(socket: Socket, message: CreateMessageDto) {
    const result = await this.messagesService.create(message);
    return this.server
      .to([message.toSocketId, message.fromSocketId])
      .emit(messages.message, result);
  }

  async handleConnection(socket: Socket) {
    try {
      const token = socket.handshake.query.token as string;
      const user = await this.authService.getUserByToken(token);
      if (!user) this.disconnectClient(socket);
      const connectedUsers = this.getConnectedUsers();
      this.server.emit(messages.userConnected, {
        socketId: socket.id,
        userId: user.id,
      });
      return this.server
        .to(socket.id)
        .emit(messages.activeUsers, { users: connectedUsers });
    } catch (err) {
      this.server
        .to(socket.id)
        .emit(messages.error, new UnauthorizedException());
      return this.disconnectClient(socket);
    }
  }

  private getConnectedUsers() {
    return this.messagesService.extractConnectedUsersData(
      this.server.sockets.sockets,
    );
  }

  private disconnectClient(socket: Socket) {
    this.server.emit(messages.userDisconnected, { id: socket.id });
    socket.disconnect();
  }

  handleDisconnect(socket: Socket) {
    return this.disconnectClient(socket);
  }
}
