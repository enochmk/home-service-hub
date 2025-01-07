import { Router } from 'express';
import * as controller from './company-staff.controller';
import schemaValidation from '../../middlewares/schema-validation.middleware';

import * as companyMiddleware from '../companies/companies.middleware';
import * as schema from './company-staff.schema';
import * as middleware from './company-staff.middleware';

const router = Router({ mergeParams: true });

router.use(companyMiddleware.checkCompanyExists);

router.get('/staff', controller.getCompanyStaff);

router.post(
  '/staff',
  schemaValidation(schema.addCompanyStaffSchema),
  middleware.checkIfUserNotAdded,
  controller.addCompanyStaff,
);

router.get('/staff/:userId', middleware.checkIfUserIsCompanyStaff, controller.getCompanyStaff);

router.delete(
  '/staff/:userId',
  schemaValidation(schema.removeCompanyStaffSchema),
  middleware.checkIfUserIsCompanyStaff,
  controller.removeCompanyStaff,
);

export default router;
