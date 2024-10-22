import { PrismaClient } from '@prisma/client';

import { getLogger } from '../libs/logger';

const prisma = new PrismaClient();

const logger = getLogger('DB');

export const connectDatabase = async () => {
  logger.verbose('Connecting to database');
  return prisma
    .$connect()
    .then(() => {
      logger.info('Connected to database');
    })
    .catch((error: any) => {
      logger.error(error.message);
      process.exit(1);
    });
};

export default prisma;
