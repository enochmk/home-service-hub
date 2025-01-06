import { RequestHandler } from 'express';
import * as service from './companies.service';
import createHttpError from 'http-errors';
import { getLogger } from '../../utils/logger';

const logger = getLogger('CompanyMiddleware');

export const checkCompanyExists: RequestHandler = async (req, res, next) => {
  const companyIds = [req.params?.companyId, req.body?.companyId].filter(Boolean);
  logger.verbose('Checking if company exists ... ', { companyIds });
  if (companyIds.length === 0) return next();
  for (const companyId of companyIds) {
    logger.verbose(`Checking company with id :${companyId}... `);
    const company = await service.getCompanyById(companyId);
    if (!company) {
      return next(new createHttpError.NotFound(`Company ${companyId} not found`));
    }
  }
  return next();
};
