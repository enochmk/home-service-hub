import createHttpError from 'http-errors';
import prisma from '../../db/prisma.db';

export async function validateStatusIdExist(statusId: number) {
  const status = await prisma.statuses.findUnique({
    where: {
      id: statusId,
    },
  });

  if (!status) {
    throw createHttpError.NotFound(`Status ID ${statusId} does not exist.`);
  }

  return status;
}
