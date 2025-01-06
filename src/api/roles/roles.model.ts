import prisma from '../../db/prisma.db';

export const findPermission = async (roleId: string, permissionId: string) => {
  return prisma.rolePermissions.findFirst({
    where: {
      roleId,
      permissionId,
    },
  });
};

export const addPermissionToRole = async (roleId: string, permissionId: string) => {
  return prisma.rolePermissions.create({
    data: {
      roleId,
      permissionId,
    },
  });
};

export const removePermissionFromRole = async (roleId: string, permissionId: string) => {
  return prisma.rolePermissions.deleteMany({
    where: {
      roleId,
      permissionId,
    },
  });
};

export const getPermissionsByRole = async (roleId: string) => {
  const role = await prisma.roles.findUnique({
    where: { id: roleId },
    include: {
      rolePermissions: {
        select: {
          permission: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return (
    role?.rolePermissions.map((rp) => ({
      id: rp.permission.id,
      name: rp.permission.name,
    })) || []
  );
};

export const getAllRoles = async () => {
  return prisma.roles.findMany();
};

export const findRoleById = async (roleId: string) => {
  return prisma.roles.findFirst({
    where: {
      id: roleId,
    },
  });
};
