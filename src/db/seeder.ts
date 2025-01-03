import prisma from './prisma.db';
import { ROLES } from '../utils/constants';
import logger from '../utils/logger';

async function seedRoles() {
  logger.verbose('Seeding roles...');
  const items = Object.values(ROLES);
  for (const role of items) {
    await prisma.roles.upsert({
      where: { name: role },
      update: {},
      create: { name: role },
    });
  }
  logger.info('Roles seeded');
}

async function seedDatabase() {
  logger.verbose('Seeding database...');
  await seedRoles();
  logger.info('Database seeded');
}

seedDatabase().catch((error) => logger.error(error.message));
