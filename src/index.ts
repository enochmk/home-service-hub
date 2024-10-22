import express, { Express } from 'express';
import http from 'http';

import { configureMiddlewares } from './middlewares/config-middleware';
import { connectDatabase } from './db/prisma.db';
import { getLogger } from './libs/logger';

const logger = getLogger('Server');

// get port and environment from config
const PORT = process.env.PORT as string;
const NODE_ENV = process.env.NODE_ENV as string;
const app: Express = express();

async function startupServer() {
  configureMiddlewares(app);
  await connectDatabase();
  const server = http.createServer(app);

  // listen to server
  server.on('listening', () => {
    logger.info(`Server listening in mode: ${NODE_ENV} on port: ${PORT}`);
  });

  // initiate server
  server.listen(PORT);
}

// start server
startupServer();
