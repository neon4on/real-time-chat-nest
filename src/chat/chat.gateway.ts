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

@WebSocketGateway({
  cors: {
    origin: '*', // Настройте CORS согласно вашим требованиям
  },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    private notificationsService: NotificationsService,
    private messagesService: MessagesService,
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
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    this.server.to(room).emit('message', `${client.data.user.username} присоединился к комнате`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    this.server.to(room).emit('message', `${client.data.user.username} покинул комнату`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: { room: string; message: string }) {
    const { room, message } = payload;
    const username = client.data.user.username;

    // Сохранение сообщения в базу данных
    await this.messagesService.createMessage(username, room, message);

    // Отправка сообщения всем в комнате
    this.server.to(room).emit('message', { user: username, message });

    // Добавление задачи в очередь для отправки уведомления
    await this.notificationsService.sendNotification({ user: username, message, room });
  }
}
