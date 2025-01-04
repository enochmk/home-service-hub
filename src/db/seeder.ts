import logger from '../utils/logger';
import { seedPermissions, seedRoles } from '../api/permissions/permissions.seeder';

async function seedDatabase() {
  logger.verbose('Seeding database...');
  await seedRoles();
  await seedPermissions();
  logger.info('Database seeded');
}

seedDatabase().catch((error) => logger.error(error.message));
