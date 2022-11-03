import { compare, hash, genSalt } from 'bcryptjs';
import { requireEnvVar } from '../../utils';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getUser } from '../../resources/users/actions';
import { User } from '../../interfaces';

const SALT_ROUNDS = requireEnvVar('SALT_ROUNDS');

export const encryptPassword = async (password: string) => {
  const salt = await genSalt(parseInt(SALT_ROUNDS));
  const passwordHash = await hash(password, salt);
  return passwordHash;
};

export const camparePasswords = async (
  password: string,
  userPassword: string,
) => {
  return await compare(password, userPassword);
};

// todo: add service and roleId
export const createJWTToken = ({ userId }: { userId: string }) => {
  return jwt.sign(
    {
      userId,
    },
    requireEnvVar('JWT_SECRET'),
    {
      expiresIn: 60 * 60 * 24 * 7,
    },
  );
};

export const decodeJWTToken = (token: string) => {
  const promise = new Promise<JwtPayload>((resolve, reject) => {
    jwt.verify(token, requireEnvVar('JWT_SECRET'), (err, decoded) => {
      if (err) {
        reject(`Error decoding token: ${err}`);
      }
      // const decodedToken = decodeObject.parse(decoded)
      // return {userId: decoded?.userId, sessionId: decoded?.sessionId}
      resolve(decoded as JwtPayload);
    });
  });

  return promise;
};

export const tradeTokenForUser = async (authToken: string) => {
  const decoded = await decodeJWTToken(authToken);
  const user = await getUser(decoded.userId);
  if (!user) throw new Error('User not found');
  return decoded?.userId;
};

export const createForgotPasswordToken = async (user: User) => {
  return jwt.sign({ user, reset: true }, requireEnvVar('JWT_SECRET'), {
    expiresIn: '5min',
  });
};
