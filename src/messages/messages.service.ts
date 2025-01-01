import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MessagesService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });
  }

  async findMessagesByRoom(roomId: number) {
    try {
      const res = await this.pool.query(
        'SELECT * FROM messages WHERE room_id = $1 ORDER BY created_at ASC',
        [roomId],
      );
      return res.rows;
    } catch (error) {
      console.error(`Ошибка при получении сообщений для комнаты ${roomId}:`, error);
      throw new InternalServerErrorException('Не удалось получить сообщения');
    }
  }

  async createMessage(username: string, roomId: number, message: string) {
    try {
      const res = await this.pool.query(
        'INSERT INTO messages (username, room_id, message) VALUES ($1, $2, $3) RETURNING *',
        [username, roomId, message],
      );
      return res.rows[0];
    } catch (error) {
      console.error('Ошибка при создании сообщения:', error);
      throw new InternalServerErrorException('Не удалось создать сообщение');
    }
  }
  

  async deleteMessage(id: number) {
    try {
      await this.pool.query('DELETE FROM messages WHERE id = $1', [id]);
      return { message: 'Сообщение удалено успешно' };
    } catch (error) {
      console.error(`Ошибка при удалении сообщения с id ${id}:`, error);
      throw new InternalServerErrorException('Не удалось удалить сообщение');
    }
  }
}
