import prisma from '../../db/prisma.db';
import { TASK_TYPES } from '../../utils/constants';
import logger from '../../utils/logger';

export async function seedTaskTypes() {
  logger.verbose('Seeding task types...');
  const items = Object.values(TASK_TYPES);
  for (const type of items) {
    await prisma.statuses.upsert({
      where: { name: type },
      update: {},
      create: { name: type },
    });
  }
  logger.info('Task types seeded successfully');
}
