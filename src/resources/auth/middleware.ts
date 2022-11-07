import { Response, Request, NextFunction } from 'express';
import { getUserByUuid } from '../../resources/users/actions';
import { tradeTokenForUser } from './utils';

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const headerToken = req.headers.authorization?.split(' ')[1];
  if (!headerToken) {
    throw new Error('Not Allowed, no token found.');
  }
  const userId = await tradeTokenForUser(headerToken);
  const user = await getUserByUuid(userId);
  if (!user) {
    throw new Error('Unauthorized');
  }
  res.locals.user = user;
  next();
};

export const serviceMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = res.locals.user;
  console.log(user);
  next();
};

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = res.locals.user;
  console.log('---Admin Middleware---');
  if (user.role === 1) {
    console.log('Admin User requesting');
  } else {
    console.log('Normal User requesting');
    throw new Error('Not Allowed');
  }
  next();
};
