import prisma from '../../db/prisma.db';
import { FindUsersParams } from './users.interface';
import { CreateUserInput, UpdateUserInput } from './users.schema';

export const findUserById = async (userId: string) => {
  return prisma.users.findUnique({
    where: {
      id: userId,
    },
    include: {
      role: true,
    },
  });
};

export const findUserByEmail = async (email: string) => {
  return prisma.users.findUnique({
    where: {
      email: email,
    },
    include: {
      role: true,
    },
  });
};

export const createUser = async (data: CreateUserInput) => {
  return prisma.users.create({
    data: data,
    include: {
      role: true,
    },
  });
};

export const updateUser = async (userId: string, data: UpdateUserInput) => {
  return prisma.users.update({
    where: {
      id: userId,
    },
    data: { ...data, updatedAt: new Date() },
    include: {
      role: true,
    },
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
    include: {
      role: true,
    },
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

export const updatePassword = async (userId: string, hashPassword: string) => {
  return prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      password: hashPassword,
      updatedAt: new Date(),
    },
    include: {
      role: true,
    },
  });
};

export const findUsers = async (query?: FindUsersParams) => {
  const { sort, limit, page } = query || {};
  const skip = limit && page ? limit * (page - 1) : 0;
  let where = {};
  if (query?.email) {
    where = { ...where, email: { contains: query.email } };
  }

  if (query?.firstName) {
    where = { ...where, firstName: { contains: query.firstName } };
  }

  if (query?.lastName) {
    where = { ...where, lastName: { contains: query.lastName } };
  }

  return prisma.users.findMany({
    select: {
      id: true,
      email: true,
      phoneNumber: true,
      firstName: true,
      lastName: true,
      active: true,
      role: true,
    },
    orderBy: {
      firstName: sort || 'asc',
    },
    where: where,
    take: Number(limit) || 10,
    skip: skip || 0,
  });
};
