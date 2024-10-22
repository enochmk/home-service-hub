import rtracer from 'cls-rtracer';
import config from 'config';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';

import { getLogger } from '../libs/logger';
import errorHandler from './error-handler.middleware';
import loggerMiddleware from './logger.middleware';
import routes from '../routes';

const corOptions = config.get('corsOptions') as object;

// configure middleware
export const configureMiddlewares = (app: Application) => {
  const logger = getLogger('Middleware');
  app.use(morgan('dev'));
  app.use(cors(corOptions));
  app.use(express.json({ limit: '50mb' }));
  app.use(helmet());
  app.use(hpp());
  app.use(rtracer.expressMiddleware());
  app.use(loggerMiddleware);
  app.use('/api/v1', routes);
  app.use(errorHandler);
  logger.info('Configured middleware!');
};
