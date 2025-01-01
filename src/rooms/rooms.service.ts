import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class RoomsService {
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

  async findAll() {
    try {
      const res = await this.pool.query('SELECT * FROM rooms ORDER BY created_at DESC');
      return res.rows;
    } catch (error) {
      console.error('Ошибка при получении комнат:', error);
      throw new InternalServerErrorException('Не удалось получить комнаты');
    }
  }

  async findOne(id: number) {
    try {
      const res = await this.pool.query('SELECT * FROM rooms WHERE id = $1', [id]);
      return res.rows[0];
    } catch (error) {
      console.error(`Ошибка при получении комнаты с id ${id}:`, error);
      throw new InternalServerErrorException('Не удалось получить комнату');
    }
  }

  async createRoom(name: string, description: string) {
    try {
      const res = await this.pool.query(
        'INSERT INTO rooms (name, description) VALUES ($1, $2) RETURNING *',
        [name, description],
      );
      return res.rows[0];
    } catch (error) {
      console.error('Ошибка при создании комнаты:', error);
      throw new InternalServerErrorException('Не удалось создать комнату');
    }
  }

  async deleteRoom(id: number) {
    try {
      await this.pool.query('DELETE FROM rooms WHERE id = $1', [id]);
      return { message: 'Комната удалена успешно' };
    } catch (error) {
      console.error(`Ошибка при удалении комнаты с id ${id}:`, error);
      throw new InternalServerErrorException('Не удалось удалить комнату');
    }
  }
}
