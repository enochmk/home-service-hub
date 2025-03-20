import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import prisma from '../../db/prisma.db';
import { getLogger } from '../../utils/logger';

const logger = getLogger('RegionsMiddleware');

export async function checkRegionIdExist(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const targetId = parseInt(req.params.regionId, 10);
  logger.verbose('Checking region ID exist', { regionId: targetId });
  const region = await prisma.regions.findMany({
    where: {
      id: targetId,
    },
  });

  // ! If the region is empty, throw a 404 error
  if (region.length === 0) {
    throw createHttpError.NotFound(`Region: ${targetId} not found`);
  }

  logger.info('Region ID exist', { regionId: targetId });
  return next();
}

export async function checkRegionNameAvailable(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const { name } = req.body;
  logger.verbose('Checking region name available', { name });
  const region = await prisma.regions.findMany({
    where: {
      name,
    },
  });

  if (region.length > 0) {
    throw createHttpError.Conflict(`This name: ${name} already exists`);
  }

  logger.info('Region name available for use', { name });
  return next();
}
