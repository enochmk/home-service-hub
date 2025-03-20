import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import prisma from '../../db/prisma.db';
import { getLogger } from '../../utils/logger';
import { CreateLocationInput } from './locations.schema';

const logger = getLogger('LocationMiddleware');

export async function checkLocationIdExist(req: Request, _res: Response, next: NextFunction) {
  const targetId = parseInt(req.params.locationId, 10);
  logger.verbose('Checking location ID exist', { locationId: targetId });
  const location = await prisma.locations.findMany({
    where: {
      id: targetId,
    },
  });

  // ! If the location is empty, throw a 404 error
  if (location.length === 0) {
    throw createHttpError.NotFound(`Location: ${targetId} not found`);
  }

  logger.info('Location ID exist', { locationId: targetId });
  return next();
}

type LocationRequest = Request<unknown, unknown, CreateLocationInput>;
export async function checkRegionIdExist(req: LocationRequest, _res: Response, next: NextFunction) {
  logger.verbose('Checking if region Id exist', { regionId: req.body.regionId });
  const region = await prisma.regions.findMany({
    where: {
      id: req.body.regionId,
    },
  });

  if (region.length === 0) {
    throw createHttpError.BadRequest(`Region: ${req.body.regionId} not found`);
  }

  logger.info('Location creation validated successfully');
  return next();
}
