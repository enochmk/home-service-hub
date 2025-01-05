import prisma from '../../db/prisma.db';
import createHttpError from 'http-errors';

export const addPermissionToRole = async (roleId: string, permissionId: string) => {
  const existingPermission = await prisma.rolePermissions.findFirst({
    where: {
      roleId,
      permissionId,
    },
  });

  if (existingPermission) {
    throw new createHttpError.Conflict('Permission already added');
  }

  return prisma.rolePermissions.create({
    data: {
      roleId,
      permissionId,
    },
  });
};

export const removePermissionFromRole = async (roleId: string, permissionId: string) => {
  const existingPermission = await prisma.rolePermissions.findFirst({
    where: {
      roleId,
      permissionId,
    },
  });

  if (!existingPermission) {
    throw new createHttpError.NotFound('Permission not found in role');
  }

  return prisma.rolePermissions.deleteMany({
    where: {
      roleId,
      permissionId,
    },
  });
};
