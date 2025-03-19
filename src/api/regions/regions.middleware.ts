import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import prisma from '../../db/prisma.db';

export async function checkIfRegionExist(req: Request, _res: Response, next: NextFunction) {
  const regionId = parseInt(req.params.regionId, 10);
  const region = await prisma.regions.findMany({
    where: {
      id: regionId,
    },
  });

  // ! If the region is empty, throw a 404 error
  if (region.length === 0) {
    throw createHttpError.NotFound('Region not found');
  }

  return next();
}
