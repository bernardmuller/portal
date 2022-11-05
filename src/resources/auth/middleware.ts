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
    throw new Error('Not Allowed');
  }
  const userId = await tradeTokenForUser(headerToken);
  const user = await getUserByUuid(userId);
  if (!user) {
    throw new Error('Not Allowed 2');
  }
  next();
};
