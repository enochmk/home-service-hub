import { RequestHandler } from 'express';
import * as service from './companies.service';
import createHttpError from 'http-errors';

export const checkCompanyExists: RequestHandler = async (req, res, next) => {
  const companyIds = [req.params?.companyId, req.body?.companyId].filter(Boolean);
  if (companyIds.length === 0) return next();
  for (const companyId of companyIds) {
    const company = await service.getCompany(companyId);
    if (!company) {
      return next(new createHttpError.NotFound(`Company ${companyId} not found`));
    }
  }
  next();
};
