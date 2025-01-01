import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class RoomsService {
  constructor() {
    this.pool = new Pool({
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });
  }

  private pool: Pool;

  async findAll() {
    const res = await this.pool.query('SELECT id, username, created_at FROM rooms');
    return res.rows;
  }

  async findOne(id: number) {
    const res = await this.pool.query('SELECT id, username, created_at FROM rooms WHERE id = $1', [id]);
    return res.rows[0];
  }
}
