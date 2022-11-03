import { Response, Request } from 'express';
import { UserModel } from '../../interfaces';
import {
  getUserByEmail,
  getUserByUuid,
  updateUser,
  updateUserPassword,
} from '../../resources/users/actions';
import { forgotPassword, login, register, resetPassword } from './actions';
import {
  createForgotPasswordToken,
  decodeJWTToken,
  encryptPassword,
} from './utils';

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

export const forgotPasswordHandler = async (req: Request, res: Response) => {
  const { email } = req.body;
  const token = await forgotPassword(email);
  res.send({ resetToken: token });
};

export const resetPasswordHandler = async (req: Request, res: Response) => {
  const { token } = req.query;
  const { password } = req.body;
  if (!token) throw new Error('No resetpassword token provided.');
  const updatedUser = await resetPassword(token as string, password);
  res.send(updatedUser);
};
