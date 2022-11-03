import { Response, Request } from 'express';
import { login, register } from './actions';

export const registerHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) throw new Error('No Email/Password provided.');
  const newUser = await register(email, password);
  res.status(200).send(newUser);
};

export const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) throw new Error('No Email/Password provided.');
  const token = await login(email, password);
  res.status(200).json(token);
};
