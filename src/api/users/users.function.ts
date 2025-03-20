import createHttpError from 'http-errors';
import prisma from '../../db/prisma.db';

export async function validateUserIdExist(userId: number) {
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw createHttpError.NotFound(`User ID ${userId} does not exist.`);
  }

  return user;
}
