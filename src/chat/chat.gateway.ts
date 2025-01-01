import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { NotificationsService } from '../notifications/notifications.service';
import { MessagesService } from '../messages/messages.service';
import { RoomsService } from '../rooms/rooms.service';

@WebSocketGateway({
  cors: {
    origin: '*', 
  },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    private readonly notificationsService: NotificationsService,
    private readonly messagesService: MessagesService,
    private readonly roomsService: RoomsService,
  ) {}

  afterInit(server: Server) {
    console.log('WebSocket сервер инициализирован');
  }

  async handleConnection(client: Socket, ...args: any[]) {
    try {
      const token = client.handshake.query.token as string;
      if (!token) {
        throw new Error('Токен отсутствует');
      }

      const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      client.data.user = payload;
      console.log(`Пользователь ${payload.username} подключился`);
    } catch (err) {
      console.log('Ошибка аутентификации WebSocket соединения:', err.message);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    if (client.data.user) {
      console.log(`Пользователь ${client.data.user.username} отключился`);
    }
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket, roomId: number) {
    const room = await this.roomsService.findOne(roomId);
    if (!room) {
      client.emit('error', 'Комната не найдена');
      return;
    }

    client.join(`room-${roomId}`);
    this.server.to(`room-${roomId}`).emit('message', `${client.data.user.username} присоединился к комнате ${room.name}`);
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(client: Socket, roomId: number) {
    const room = await this.roomsService.findOne(roomId);
    if (!room) {
      client.emit('error', 'Комната не найдена');
      return;
    }

    client.leave(`room-${roomId}`);
    this.server.to(`room-${roomId}`).emit('message', `${client.data.user.username} покинул комнату ${room.name}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: { roomId: number; message: string }) {
    const { roomId, message } = payload;
    const room = await this.roomsService.findOne(roomId);
    if (!room) {
      client.emit('error', 'Комната не найдена');
      return;
    }

    const username = client.data.user.username;

    // Сохранение сообщения в базу данных
    const savedMessage = await this.messagesService.createMessage(username, roomId, message);

    // Отправка сообщения всем в комнате
    this.server.to(`room-${roomId}`).emit('message', {
      user: username,
      message: message,
      created_at: savedMessage.created_at,
    });

    // Добавление задачи в очередь для отправки уведомления
    await this.notificationsService.sendNotification({ user: username, message, roomId });
  }
}
