import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import prisma from '../../db/prisma.db';

export async function checkLocationIdExist(req: Request, _res: Response, next: NextFunction) {
  const locationId = parseInt(req.params.locationId, 10);
  const location = await prisma.locations.findMany({
    where: {
      id: locationId,
    },
  });

  // ! If the location is empty, throw a 404 error
  if (location.length === 0) {
    throw createHttpError.NotFound('Location not found');
  }

  return next();
}

export async function checkLocationNameAvailable(req: Request, _res: Response, next: NextFunction) {
  // const { name } = req.body;
  // const location = await prisma.locations.findMany({
  //   where: {
  //     name,
  //   },
  // });

  // if (location.length > 0) {
  //   throw createHttpError.Conflict('This name already exists');
  // }

  return next();
}
