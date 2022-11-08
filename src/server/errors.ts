import { ErrorRequestHandler } from 'express';
import {
  AuthenticationError,
  NotAllowedError,
  NotFoundError,
  UserError,
} from '../utils/errors';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  }
  switch (err) {
    case err instanceof AuthenticationError:
      res.status(403).json({ error: { message: err.message } });
    case err instanceof UserError:
      res.status(401).json({ error: { message: err.message } });
    case err instanceof NotFoundError:
      res.status(404).json({ error: { message: err.message } });
    case err instanceof NotAllowedError:
      res.status(403).json({ error: { message: err.message } });
    default:
      res.status(500).json({ error: { message: 'Internal server error' } });
  }
};
