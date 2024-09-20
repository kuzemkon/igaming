import dotenv from 'dotenv';
dotenv.config();

export const config = {
  jwtSecret: process.env.JWT_SECRET || 'supersecret',
  gcp: {
    pubsubTopic: process.env.GCP_PUBSUB_TOPIC || 'user-registration-topic',
    projectId: process.env.GCP_PROJECT_ID || 'my-project-id',
  },
  postgres: {
    host: process.env.PG_HOST || 'localhost',
    port: Number(process.env.PG_PORT) || 5432,
    user: process.env.PG_USER || 'user',
    password: process.env.PG_PASSWORD || 'password',
    database: process.env.PG_DATABASE || 'mydatabase',
  },
  cassandra: {
    contactPoints: [process.env.CASSANDRA_HOST || 'localhost'],
    keyspace: process.env.CASSANDRA_KEYSPACE || 'mykeyspace',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
  },
  port: process.env.PORT || 3000,
};
