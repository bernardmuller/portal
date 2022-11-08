import { Response, Request } from 'express';
import { NotFoundError, UserError } from '../../utils/errors';
import { sendEmail } from '../../resources/email/actions';
import { forgotPassword, login, register, resetPassword } from './actions';

export const registerHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) throw new Error('No Email/Password provided.');
  const newUser = await register(email, password);
  res.status(200).send(newUser);
};

export const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) throw new UserError('No Email/Password provided.');
  const token = await login(email, password);
  res.status(200).json(token);
};

export const forgotPasswordHandler = async (req: Request, res: Response) => {
  const { email } = req.body;
  const token = await forgotPassword(email);
  // Add email here
  // await sendEmail(email, token);
  res.send({ resetToken: token });
};

export const resetPasswordHandler = async (req: Request, res: Response) => {
  const { token } = req.query;
  const { password } = req.body;
  if (!token) throw new NotFoundError('No resetpassword token provided.');
  const updatedUser = await resetPassword(token as string, password);
  res.send(updatedUser);
};
