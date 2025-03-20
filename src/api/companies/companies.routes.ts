import { Router } from 'express';
import * as controller from './companies.controller';
import * as middleware from './companies.middleware';
import { checkPermission } from '../permissions/permissions.middleware';
import { PERMISSIONS } from '../../utils/constants';
import schemaValidation from '../../middlewares/schema-validation.middleware';
import { createCompanySchema, updateCompanySchema } from './companies.schema';
import * as companyMiddleware from './companies.middleware';

const router = Router();

router.post(
  '/',
  schemaValidation(createCompanySchema),
  checkPermission([PERMISSIONS['company.create']]),
  middleware.checkCompanyNameAvailable,
  controller.createCompany,
);

router.get(
  '/',
  checkPermission([PERMISSIONS['company.view']]),
  controller.getCompanies,
);

router.put(
  '/:companyId',
  schemaValidation(updateCompanySchema),
  checkPermission([PERMISSIONS['company.update']]),
  companyMiddleware.checkCompanyExists,
  controller.updateCompanyById,
);

router.delete(
  '/:companyId',
  checkPermission([PERMISSIONS['company.delete']]),
  companyMiddleware.checkCompanyExists,
  controller.deleteCompanyById,
);

router.get(
  '/:companyId',
  checkPermission([PERMISSIONS['company.view']]),
  companyMiddleware.checkCompanyExists,
  controller.getCompanyById,
);

export default router;
