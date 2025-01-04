import { PrismaClient } from '@prisma/client';
import { getLogger } from '../utils/logger';

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

export const disconnectDatabase = async () => {
  logger.verbose('Disconnecting from database');
  return prisma
    .$disconnect()
    .then(() => {
      logger.info('Disconnected from database');
    })
    .catch((error: any) => {
      logger.error(error.message);
      process.exit(1);
    });
};
export default prisma;
