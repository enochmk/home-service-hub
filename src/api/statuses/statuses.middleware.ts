import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { getLogger } from '../../utils/logger';
import prisma from '../../db/prisma.db';

const logger = getLogger('StatusesMiddleware');

export async function checkStatusIdExist(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const targetId = parseInt(req.params.statusId, 10);
  logger.verbose('Checking status ID exist', { statusId: targetId });
  const status = await prisma.statuses.findMany({
    where: {
      id: targetId,
    },
  });

  // ! If the status is empty, throw a 404 error
  if (status.length === 0) {
    throw createHttpError.NotFound(`Status: ${targetId} not found`);
  }

  logger.info('Status ID exist', { status });
  return next();
}

export async function checkStatusNameAvailable(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const { name } = req.body;
  logger.verbose('Checking status name available', { name });
  const status = await prisma.statuses.findMany({
    where: {
      name,
    },
  });

  if (status.length > 0) {
    throw createHttpError.Conflict(`This name: ${name} already exists`);
  }

  logger.info('Status name available for use', { name });
  return next();
}
