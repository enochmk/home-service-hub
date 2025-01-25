import prisma from '../../db/prisma.db';
import { usersInclude, UserQueryOptions } from './users.interface';
import { CreateUserInput, UpdateUserInput } from './users.schema';

export const findUserById = async (userId: string) => {
  return prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: usersInclude,
  });
};

export const findUserByEmail = async (email: string) => {
  return prisma.users.findUnique({
    where: {
      email: email,
    },
    select: usersInclude,
  });
};

export const createUser = async (data: CreateUserInput) => {
  return prisma.users.create({
    data: data,
    select: usersInclude,
  });
};

export const updateUser = async (userId: string, data: UpdateUserInput) => {
  return prisma.users.update({
    where: {
      id: userId,
    },
    data: { ...data, updatedAt: new Date() },
    select: usersInclude,
  });
};

export const deleteUser = async (userId: string) => {
  return prisma.users.delete({
    where: {
      id: userId,
    },
  });
};

export const updateUserPassword = async (userId: string, password: string) => {
  return prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      password: password,
      updatedAt: new Date(),
    },
    select: usersInclude,
  });
};

export const getPermissionsByRoleId = async (roleId: string) => {
  const role = await prisma.roles.findFirst({
    where: {
      id: roleId,
    },
    include: {
      rolePermissions: {
        select: {
          permission: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return role?.rolePermissions.map((rp) => rp.permission.name) || [];
};

export const updatePassword = async (
  userId: string,
  hashPassword: string,
  shouldUpdatePassword?: boolean,
) => {
  return prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      password: hashPassword,
      shouldUpdatePassword: shouldUpdatePassword || false,
      updatedAt: new Date(),
    },
    select: usersInclude,
  });
};

export const findUsers = async (query?: UserQueryOptions) => {
  const { filters, orderBy, limit, offset } = query || {};
  return prisma.users.findMany({
    where: filters,
    orderBy: orderBy || { firstName: 'asc' },
    take: limit,
    skip: offset,
    select: usersInclude,
  });
};

export const addUserToCompanyStaff = async (userId: string, companyId: string) => {
  return prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      companyStaffs: {
        create: {
          companyId: companyId,
        },
      },
    },
    select: usersInclude,
  });
};

export const findRoleByName = async (roleName: string) => {
  return prisma.roles.findFirst({
    where: {
      name: roleName,
    },
  });
};

export const findRoleById = async (roleId: string) => {
  return prisma.roles.findUnique({
    where: {
      id: roleId,
    },
  });
};
