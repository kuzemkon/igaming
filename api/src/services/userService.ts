import { inject, singleton } from 'tsyringe';
// import { PubSubService } from './pubsubService';
import { PostgresService } from './postgresService';
import { RedisService } from './redisService';
// import { CassandraService } from './cassandraService';
import { md5Hash } from '../utils/hash';
import { generateJWT, verifyJWT } from '../utils/jwt';

@singleton()
export class UserService {
  constructor(
    // @inject(PubSubService) private pubsubService: PubSubService,
    @inject(PostgresService) private postgresService: PostgresService,
    @inject(RedisService) private redisService: RedisService,
    // @inject(CassandraService) private cassandraService: CassandraService,
  ) {}

  // Register a new user by publishing the registration to Pub/Sub
  async registerUser(userData: any) {
    const encryptedPassword = md5Hash(userData.password);

    // Save user to PostgreSQL
    const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
    const newUser = await this.postgresService.query(query, [userData.email, encryptedPassword]);

    // Publish message to Pub/Sub
    // await this.pubsubService.publishMessage('user-registration', { ...newUser[0] });

    return newUser[0];
  }

  // Handle user login by fetching the user from PostgreSQL and validating the password
  async loginUser(email: string, password: string) {
    // Query PostgreSQL to retrieve the user by email
    const user = await this.postgresService.query('SELECT * FROM users WHERE email = $1', [email]);

    if (!user || user.length === 0) {
      throw new Error('User not found');
    }

    const userData = user[0];

    // Validate the password using MD5 hash
    if (userData.password !== md5Hash(password)) {
      throw new Error('Invalid credentials');
    }

    const sessionId = `sess_${Date.now()}`;
    const token = generateJWT({ userId: userData.id, sessionId });

    // Save session in Redis
    await this.redisService.saveSession(sessionId, {
      userId: userData.id,
      email: userData.email,
      createdAt: new Date(),
    });

    // Save session in Cassandra
    // await this.cassandraService.createSession(sessionId, {
    //   userId: userData.id,
    //   email: userData.email,
    //   createdAt: new Date(),
    // });

    return { token, sessionId };
  }

  // Retrieve session from Redis
  async getSession(sessionId: string, token: string) {
    const decoded = verifyJWT(token); // Validate token

    const session = await this.redisService.getSession(sessionId);
    if (!session || decoded.sessionId !== sessionId) {
      throw new Error('Unauthorized access to session');
    }

    return session;
  }

  // Handle user logout
  async logout(token: string) {
    const decoded = verifyJWT(token);
    const sessionId = decoded.sessionId;

    // // Terminate the session in Cassandra
    // await this.cassandraService.updateSession(sessionId, new Date());

    // Remove the session from Redis
    await this.redisService.deleteSession(sessionId);

    return { message: 'Logged out successfully' };
  }
}
