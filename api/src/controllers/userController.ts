import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UserService } from '../services/userService';

const userService = container.resolve(UserService);

export const registerUser = async (req: Request, res: Response) => {
  try {
    const newUser = await userService.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, sessionId } = await userService.loginUser(email, password);
    res.status(200).json({ token, sessionId });
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

export const getSession = async (req: Request, res: Response) => {
  try {
    const session = await userService.getSession(req.params.id, req.headers.authorization!.split(' ')[1]);
    res.status(200).json(session);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.logout(req.headers.authorization!.split(' ')[1]);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
