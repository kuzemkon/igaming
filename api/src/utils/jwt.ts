import jwt from 'jsonwebtoken';
import { config } from '../config';

export const generateJWT = (payload: object): string => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
};

export const verifyJWT = (token: string): any => {
  return jwt.verify(token, config.jwtSecret);
};
