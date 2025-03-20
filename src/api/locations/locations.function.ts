import createHttpError from 'http-errors';
import prisma from '../../db/prisma.db';

export async function validateLocationIdExist(locationId: number) {
  const location = await prisma.locations.findUnique({
    where: {
      id: locationId,
    },
  });

  if (!location) {
    throw createHttpError.NotFound(`Location ID ${locationId} does not exist.`);
  }

  return location;
}
