import { Pool } from 'pg';
import { singleton } from 'tsyringe';
import { config } from '../config';

@singleton()
export class PostgresService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: config.postgres.host,
      port: config.postgres.port,
      user: config.postgres.user,
      password: config.postgres.password,
      database: config.postgres.database,
    });
  }

  async query(query: string, params: any[] = []) {
    const result = await this.pool.query(query, params);
    return result.rows;
  }
}
