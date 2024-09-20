import cassandra from 'cassandra-driver';
import { singleton } from 'tsyringe';
import { config } from '../config';

@singleton()
export class CassandraService {
  private client: cassandra.Client;

  constructor() {
    this.client = new cassandra.Client({
      contactPoints: config.cassandra.contactPoints,
      keyspace: config.cassandra.keyspace,
    });
  }

  async execute(query: string, params: any[] = []) {
    return this.client.execute(query, params);
  }

  async createSession(sessionId: string, userData: object) {
    const query = `INSERT INTO sessions (session_id, user_data, created_at) VALUES (?, ?, now())`;
    await this.execute(query, [sessionId, JSON.stringify(userData)]);
  }

  async updateSession(sessionId: string, terminatedAt: Date) {
    const query = `UPDATE sessions SET terminated_at = ? WHERE session_id = ?`;
    await this.execute(query, [terminatedAt, sessionId]);
  }
}
