import createHttpError from 'http-errors';
import prisma from '../../db/prisma.db';

export async function validateRequestIdExist(requestId: number) {
  const request = await prisma.requests.findUnique({
    where: {
      id: requestId,
    },
  });

  if (!request) {
    throw createHttpError.NotFound(`Request ID: ${requestId} does not exist.`);
  }

  return request;
}
