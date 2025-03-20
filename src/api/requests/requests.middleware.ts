import createHttpError from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import { getLogger } from '../../utils/logger';
import prisma from '../../db/prisma.db';
import { validateStatusIdExist } from '../statuses/statuses.function';
import { validateLocationIdExist } from '../locations/locations.function';
import { validateCompanyIdExist } from '../companies/companies.function';
import { CreateRequestInput } from './requests.schema';

const logger = getLogger('RequestsMiddleware');

export async function checkRequestIdExist(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  logger.verbose(`Checking if request ID exists: ${req.params.id}`);
  const requestId = parseInt(req.params.id);
  const data = await prisma.requests.findUnique({
    where: {
      id: requestId,
    },
  });

  if (!data) {
    throw createHttpError.NotFound(
      `Request ID ${req.params.id} does not exist.`,
    );
  }

  logger.info('Request ID exists.', data);
  return next();
}

type CreateRequest = Request<any, any, CreateRequestInput>;
export async function validateRequestCreation(
  req: CreateRequest,
  _res: Response,
  next: NextFunction,
) {
  logger.verbose('Validating request.', req.body);

  if (req.body.statusId) {
    const statusId = req.body.statusId;
    logger.verbose(`Validating status ID. ${statusId}`);
    await validateStatusIdExist(statusId);
    logger.info('Status ID validated');
  }

  if (req.body.locationId) {
    const locationId = req.body.locationId;
    logger.verbose(`Validating location ID. ${locationId}`);
    await validateLocationIdExist(locationId);
    logger.info('Location ID validated');
  }

  if (req.body.companyId) {
    const companyId = req.body.companyId;
    logger.verbose(`Validating company ID. ${companyId}`);
    await validateCompanyIdExist(companyId);
    logger.info('Company ID validated');
  }

  logger.info('Request creation validated.');
  return next();
}
