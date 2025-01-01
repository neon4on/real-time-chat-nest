import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class MessagesService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });
  }

  async createMessage(username: string, room: string, message: string) {
    const query = `
      INSERT INTO messages (username, room, message, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *
    `;
    const values = [username, room, message];
    const res = await this.pool.query(query, values);
    return res.rows[0];
  }
}
