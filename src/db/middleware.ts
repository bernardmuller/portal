import { configureRedisDb } from './index';
import { NextFunction, Request, Response } from 'express';

export const dbMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  configureRedisDb(req, res);
  next();
};
