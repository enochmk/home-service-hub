import express, { Express, Application } from 'express';
import http from 'http';
import rtracer from 'cls-rtracer';
import config from 'config';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import errorHandler from './middlewares/error-handler.middleware';
import requestLogger from './middlewares/request-logger.middleware';
import { getLogger } from './utils/logger';
import routes from './routes';
import { connectDatabase, disconnectDatabase } from './db/prisma.db';

const logger = getLogger('Server');

// get port and environment from config
const PORT = process.env['PORT'] || 4000;
const NODE_ENV = process.env['NODE_ENV'] || 'development';

const corOptions = config.get('corsOptions') as object;

// configure middleware
export function configureMiddlewares(app: Application) {
  app.use(hpp());
  app.use(helmet());
  app.use(cors(corOptions));
  app.use(rtracer.expressMiddleware());
  app.use(express.json({ limit: '1mb' }));
  app.use(requestLogger);
  app.use('/api/v1', routes);
  app.use(errorHandler);
}

const app: Express = express();
configureMiddlewares(app);

async function initializeServer() {
  const server = http.createServer(app);

  // start server
  server.on('listening', async () => {
    await connectDatabase();
    logger.info(`Server listening in mode: ${NODE_ENV} on port: ${PORT}`);
  });

  server.on('error', async (err) => {
    await disconnectDatabase();
    logger.error(`Server error: ${err}`);
    process.exit(1);
  });

  server.listen(PORT);
}

initializeServer();
