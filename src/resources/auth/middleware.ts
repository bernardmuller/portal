import { Response, Request, NextFunction } from 'express';
import { getUserByUuid } from '../../resources/users/actions';
import { tradeTokenForUser } from './utils';
import authConfig from './auth.json';

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
  const target = req.baseUrl.split('/')[1];
  const service = user.services.find(
    (service: any) => service.toLowerCase() === target,
  );
  if (!service) {
    throw new Error('Not Allowed, User not Registered with service');
  }
  next();
};

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = res.locals.user;
  console.log('---Admin Middleware---');
  const admin = authConfig.roles.find((role) => role.name === 'admin');
  if (admin && user.role === admin.id) {
    console.log(`Admin User: ${user.id} requesting`);
    next();
  } else {
    console.log(`User: ${user.id} requesting`);
    throw new Error('Not Allowed');
  }
};
