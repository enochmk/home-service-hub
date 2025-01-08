import prisma from '../../db/prisma.db';
import { PERMISSIONS, ROLE_PERMISSIONS, ROLES } from '../../utils/constants';
import logger from '../../utils/logger';

export async function seedRoles() {
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

export async function seedPermissions() {
  logger.verbose('Seeding permissions...');
  // delete all existing permissions
  await prisma.permissions.deleteMany();
  const permissions = Object.values(PERMISSIONS);
  for (const permission of permissions) {
    await prisma.permissions.upsert({
      where: { name: permission },
      update: {},
      create: { name: permission },
    });
  }

  const roles = Object.keys(ROLE_PERMISSIONS);
  for (const role of roles) {
    const roleRecord = await prisma.roles.findUnique({ where: { name: role } });
    if (!roleRecord) continue;
    // delete all role permissions
    await prisma.rolePermissions.deleteMany({ where: { roleId: roleRecord.id } });
    const rolePermissions = ROLE_PERMISSIONS[role];
    for (const permission of rolePermissions) {
      const permissionRecord = await prisma.permissions.findUnique({ where: { name: permission } });
      if (!permissionRecord) continue;

      await prisma.rolePermissions.upsert({
        where: {
          roleId_permissionId: {
            roleId: roleRecord.id,
            permissionId: permissionRecord.id,
          },
        },
        create: {
          roleId: roleRecord.id,
          permissionId: permissionRecord.id,
        },
        update: {},
      });
    }
  }
  logger.info('Permissions seeded');
}
