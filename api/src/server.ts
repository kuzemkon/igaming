import app from './app';
import { config } from './config';
import 'reflect-metadata';

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
