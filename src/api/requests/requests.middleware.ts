import createHttpError from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import { getLogger } from '../../utils/logger';
import prisma from '../../db/prisma.db';

const logger = getLogger('RequestsMiddleware');

export async function checkRequestIdExist(req: Request, _res: Response, next: NextFunction) {
  logger.verbose(`Checking if request ID exists: ${req.params.id}`);
  const requestId = parseInt(req.params.id);
  const data = await prisma.requests.findUnique({
    where: {
      id: requestId,
    },
  });

  if (!data) {
    throw createHttpError.NotFound(`Request ID ${req.params.id} does not exist.`);
  }

  logger.info('Request ID exists.', data);
  return next();
}
