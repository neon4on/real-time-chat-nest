import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { MessagesModule } from './messages/messages.module';
import { ChatGateway } from './chat/chat.gateway';
import { JwtModule } from '@nestjs/jwt';
import { BullModule } from '@nestjs/bull';
import { NotificationsModule } from './notifications/notifications.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RoomsModule,
    MessagesModule,
    JwtModule.register({}),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    NotificationsModule,
    PrometheusModule.register(),
  ],
  providers: [ChatGateway],
})
export class AppModule {}
