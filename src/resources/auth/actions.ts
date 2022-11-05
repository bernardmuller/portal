import { getUuid } from '../../utils';
import {
  checkIfUserExistsByEmail,
  createUser,
  getUserByEmail,
  getUserByUuid,
  updateUserPassword,
} from '../../resources/users/actions';
import {
  encryptPassword,
  camparePasswords,
  createJWTToken,
  createForgotPasswordToken,
  decodeJWTToken,
} from './utils';
import { UserModel } from '../../interfaces';

export const register = async (email: string, password: string) => {
  const existingUser = await checkIfUserExistsByEmail(email);
  if (existingUser) throw new Error('User with that email already exists.');
  const hash = await encryptPassword(password);
  const newUser = await createUser({
    id: getUuid(),
    email: email,
    password: hash,
  });
  return newUser;
};

export const login = async (email: string, password: string) => {
  const existingUser = await checkIfUserExistsByEmail(email);
  if (!existingUser) throw new Error('Invalid email and/or password');
  const user = await getUserByEmail(email);
  const isPasswordValid = await camparePasswords(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid email and/or password');
  const jwt = createJWTToken({
    userId: user.id,
  });
  return { token: jwt };
};

export const forgotPassword = async (email: string) => {
  const user = await getUserByEmail(email);
  const parsedUser = UserModel.parse(user);
  const token = await createForgotPasswordToken(parsedUser);
  return token;
};

export const resetPassword = async (token: string, password: string) => {
  const decodedToken = await decodeJWTToken(token as string).catch((err) => {
    throw new Error(err);
  });
  if (!password) throw new Error('No password Provided');
  const newHash = await encryptPassword(password);
  const user = await getUserByUuid(decodedToken.user.id);
  const updatedUser = await updateUserPassword(user?.entityId, newHash);
  return updatedUser;
};
