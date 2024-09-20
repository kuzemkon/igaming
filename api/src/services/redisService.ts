
import { createClient, RedisClientType } from 'redis';
import { singleton } from 'tsyringe';
import { config } from '../config';  // Import your config module

@singleton()
export class RedisService {
  private client: RedisClientType;

  constructor() {
    // Form the Redis URL using the config module
    const redisUrl = `redis://${config.redis.host}:${config.redis.port}`;

    // Initialize the Redis client
    this.client = createClient({ url: redisUrl });

    // Handle Redis connection errors
    this.client.on('error', (err) => {
      console.error('Redis Client Error', err);
    });

    // Connect the client
    this.connect();
  }

  // Method to connect to Redis
  private async connect() {
    if (!this.client.isOpen) {
      try {
        await this.client.connect();
        console.log('Connected to Redis');
      } catch (err) {
        console.error('Failed to connect to Redis:', err);
      }
    }
  }

  // Method to save a session
  async saveSession(sessionId: string, data: object) {
    await this.connect();  // Ensure the client is connected
    await this.client.set(sessionId, JSON.stringify(data));
  }

  // Method to retrieve a session
  async getSession(sessionId: string) {
    await this.connect();  // Ensure the client is connected
    const session = await this.client.get(sessionId);
    return session ? JSON.parse(session) : null;
  }

  // Method to delete a session
  async deleteSession(sessionId: string) {
    await this.connect();  // Ensure the client is connected
    await this.client.del(sessionId);
  }

  // Gracefully close the Redis connection when the application shuts down
  public async disconnect() {
    if (this.client.isOpen) {
      await this.client.quit();
    }
  }
}
