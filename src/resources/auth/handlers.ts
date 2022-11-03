import { Response, Request } from 'express';
import { UserModel } from '../../interfaces';
import {
  getUserByEmail,
  getUserByUuid,
  updateUser,
  updateUserPassword,
} from '../../resources/users/actions';
import { login, register } from './actions';
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
  const user = await getUserByEmail(email);
  const parsedUser = UserModel.parse(user);
  const token = await createForgotPasswordToken(parsedUser);
  res.send({ resetToken: token });
};

export const resetPasswordHandler = async (req: Request, res: Response) => {
  const { token } = req.query;
  const decodedToken = await decodeJWTToken(token as string).catch((err) => {
    throw new Error(err);
  });
  const { password } = req.body;
  if (!password) throw new Error('No password Provided');
  const newHash = await encryptPassword(password);
  const user = await getUserByUuid(decodedToken.user.id);
  const updatedUser = await updateUserPassword(user?.entityId, newHash);
  res.send(updatedUser);
};
