import { PORT } from '../config';
import express, { NextFunction, Request, Response } from 'express';
import { portCB } from './utils';
import { connectToDatabase } from '../db';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { router } from './routes';
import { errorHandler } from './errors';
import { format } from 'date-fns';
import { configureProxyRoutes } from './proxyRoutes';

export const app = express();

function createApp() {
  app.use(helmet());
  app.use(bodyParser.json());

  app.use('/', router);
  configureProxyRoutes(app);

  app.use(errorHandler);

  app.listen(PORT, () => {
    portCB();
    console.log(`Server started at: ${format(new Date(), 'yyyy-MM-dd HH:mm')}`);
    connectToDatabase();
  });
}

export default createApp;
