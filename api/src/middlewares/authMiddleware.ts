import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../utils/jwt';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = verifyJWT(token);
    // @ts-ignore: Ignore TypeScript error on this line
    req.user = decoded;  // Temporarily ignoring the error here
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
