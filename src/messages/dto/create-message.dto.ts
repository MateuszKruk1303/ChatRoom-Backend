export class CreateMessageDto {
  text: string;
  fromId: number;
  toId: number;
  toSocketId: string;
  fromSocketId: string;
}
