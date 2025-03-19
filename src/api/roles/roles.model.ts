import prisma from '../../db/prisma.db';

export const findPermission = async (roleId: number, permissionId: number) => {
  return prisma.rolePermissions.findFirst({
    where: {
      roleId,
      permissionId,
    },
  });
};

export const addPermissionToRole = async (roleId: number, permissionId: number) => {
  return prisma.rolePermissions.create({
    data: {
      roleId,
      permissionId,
    },
  });
};

export const removePermissionFromRole = async (roleId: number, permissionId: number) => {
  return prisma.rolePermissions.deleteMany({
    where: {
      roleId,
      permissionId,
    },
  });
};

export const getPermissionsByRole = async (roleId: number) => {
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

export const findRoleById = async (roleId: number) => {
  return prisma.roles.findFirst({
    where: {
      id: roleId,
    },
  });
};
