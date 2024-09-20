import express from 'express';
import 'reflect-metadata';  // Required for tsyringe
import userRoutes from './routes/userRoutes';

const app = express();
app.use(express.json());

// Register routes
app.use('/api/users', userRoutes);

export default app;
