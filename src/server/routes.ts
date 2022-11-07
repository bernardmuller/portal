import { NextFunction, Request, Response, Router } from 'express';
import {
  adminMiddleware,
  authenticateUser,
  serviceMiddleware,
} from '../resources/auth/middleware';
import endpoints from './endpoints';
import { dbMiddleware } from './utils';

export const router = Router();

enum method {
  get = 'get',
  put = 'put',
  post = 'post',
  delete = 'delete',
}

type Endpoint = {
  method: method;
  path: string;
  handler: (req: Request, res: Response) => void;
  authenticate: boolean;
  requiresAdmin: boolean;
};

export const catchAsync = (
  func: (req: Request, res: Response, next: NextFunction) => any,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch(next);
  };
};

export const createEndpoint = (router: Router, endpoint: Endpoint) => {
  let auth = endpoint.authenticate ? [authenticateUser] : [];
  let admin = endpoint.requiresAdmin ? [adminMiddleware] : [];
  const authMiddleware = auth.map((ware) => catchAsync(ware));
  const _adminMiddleware = admin.map((ware) => catchAsync(ware));
  router[endpoint.method](
    endpoint.path,
    dbMiddleware,
    ...authMiddleware,
    ..._adminMiddleware,
    catchAsync(endpoint.handler),
  );
};

endpoints.forEach((endpoint) =>
  createEndpoint(router, {
    ...endpoint,
    method: endpoint.method as method,
  }),
);
