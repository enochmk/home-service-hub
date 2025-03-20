import prisma from '../../db/prisma.db';
import { REQUEST_STATUSES } from '../../utils/constants';
import logger from '../../utils/logger';

export async function seedRequestStatuses() {
  logger.verbose('Seeding request statuses...');
  const items = Object.values(REQUEST_STATUSES);
  for (const status of items) {
    await prisma.statuses.upsert({
      where: { name: status },
      update: {},
      create: { name: status },
    });
  }
  logger.info('Statuses seeded');
}
