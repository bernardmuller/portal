import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  }
  switch (err) {
    default:
      res.status(401).json({ error: { message: err.message } });
  }
};
