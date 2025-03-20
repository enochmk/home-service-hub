import { RequestHandler } from 'express';
import * as model from './companies.model';
import createHttpError from 'http-errors';
import { getLogger } from '../../utils/logger';

const logger = getLogger('CompanyMiddleware');

export const checkCompanyExists: RequestHandler = async (req, res, next) => {
  const companyIds = [
    parseInt(req.params?.companyId),
    parseInt(req.body?.companyId),
  ].filter(Boolean);
  logger.verbose('Checking if company exists ... ', { companyIds });
  if (companyIds.length === 0) return next();
  for (const companyId of companyIds) {
    logger.verbose(`Checking company with id: ${companyId}... `);
    const company = await model.findCompanyById(companyId);
    if (!company) {
      return next(
        new createHttpError.NotFound(`Company ${companyId} not found`),
      );
    }
  }
  return next();
};

export const checkCompanyNameAvailable: RequestHandler = async (
  req,
  res,
  next,
) => {
  const { name } = req.body;
  logger.verbose('Checking if company name available ... ', { name });
  const company = await model.findCompanyByName(name);
  // ! If company with the same name already exists, return 409 Conflict
  if (company) {
    return next(
      new createHttpError.Conflict(`Company with name ${name} already exists`),
    );
  }
  return next();
};
