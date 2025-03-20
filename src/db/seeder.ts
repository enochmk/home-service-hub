import logger from '../utils/logger';
import {
  seedPermissions,
  seedRoles,
} from '../api/permissions/permissions.seeder';
import { seedRequestStatuses } from '../api/statuses/statuses.seeder';
import { seedTaskTypes } from '../api/task-types/task-types.seeder';

async function seedDatabase() {
  logger.verbose('Seeding database...');
  await seedRoles();
  await seedPermissions();
  await seedRequestStatuses();
  await seedTaskTypes();
  logger.info('Database seeded');
}

seedDatabase().catch((error) => logger.error(error.message));
