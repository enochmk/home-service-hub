import prisma from '../../db/prisma.db';

export const findUserByEmail = async (email: string) => {
  const foundUser = await prisma.users.findFirst({
    where: {
      email: {
        equals: email,
        mode: 'insensitive',
      },
    },
    include: {
      role: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return foundUser;
};

export const changePassword = async (userId: string, hashPassword: string) => {
  const updatedUser = await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      password: hashPassword,
    },
  });
  return updatedUser;
};

export const createUser = async (data: any) => {
  const newUser = await prisma.users.create({
    data: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      role: {
        connect: {
          name: data.roleName,
        },
      },
    },
  });
  return newUser;
};

export const findRoleByName = async (name: string) => {
  const role = await prisma.roles.findFirst({
    where: {
      name: {
        equals: name,
        mode: 'insensitive',
      },
    },
  });
  return role;
};

export const findUserById = async (userId: string) => {
  const foundUser = await prisma.users.findFirst({
    where: {
      id: userId,
    },
    include: {
      role: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return foundUser;
};

export const addPasswordResetToken = async (userId: string, token: string) => {
  const user = await prisma.passwordResets.create({
    data: {
      userId,
      token,
    },
  });
  return user;
};

export const findPasswordResetToken = async (token: string) => {
  const passwordReset = await prisma.passwordResets.findFirst({
    where: {
      token,
      isExpired: false,
    },
  });
  return passwordReset;
};

export const expirePasswordResetToken = async (userId: string) => {
  const passwordReset = await prisma.passwordResets.update({
    data: {
      isExpired: true,
      updatedAt: new Date(),
    },
    where: {
      id: userId,
    },
  });
  return passwordReset;
};
