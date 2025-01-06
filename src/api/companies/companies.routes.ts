import { Router } from 'express';
import * as controller from './companies.controller';
import { checkPermission } from '../permissions/permissions.middleware';
import { PERMISSIONS } from '../../utils/constants';
import schemaValidation from '../../middlewares/schema-validation.middleware';
import { createCompanySchema, updateCompanySchema } from './companies.schema';

const router = Router();

router.post(
  '/',
  schemaValidation(createCompanySchema),
  checkPermission([PERMISSIONS['company.create']]),
  controller.createCompany,
);

router.put(
  '/:companyId',
  schemaValidation(updateCompanySchema),
  checkPermission([PERMISSIONS['company.update']]),
  controller.updateCompany,
);

router.delete(
  '/:companyId',
  checkPermission([PERMISSIONS['company.delete']]),
  controller.deleteCompany,
);

router.get('/:companyId', checkPermission([PERMISSIONS['company.view']]), controller.getCompany);

router.get('/', checkPermission([PERMISSIONS['company.view']]), controller.getCompanies);

export default router;
