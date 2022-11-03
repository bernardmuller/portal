import { getUuid } from '../../utils';
import {
  checkIfUserExistsByEmail,
  createUser,
  getUserByEmail,
} from '../../resources/users/actions';
import { encryptPassword, camparePasswords, createJWTToken } from './utils';

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
  console.log(user.id);
  const isPasswordValid = await camparePasswords(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid email and/or password');
  const jwt = createJWTToken({
    userId: user.id,
  });
  return { token: jwt };
};
