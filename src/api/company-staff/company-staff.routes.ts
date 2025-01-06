import { Router } from 'express';
import * as controller from './company-staff.controller';
import schemaValidation from '../../middlewares/schema-validation.middleware';
import { createCompanyStaffSchema, deleteCompanyStaffSchema } from './company-staff.schema';
import * as companyMiddleware from '../companies/companies.middleware';
import * as userMiddleware from '../users/users.midddleware';
import * as middleware from './company-staff.middleware';

const router = Router({ mergeParams: true });

router.use(companyMiddleware.checkCompanyExists);

router.get('/staff', controller.getCompanyStaff);

router.post(
  '/staff',
  schemaValidation(createCompanyStaffSchema),
  userMiddleware.checkUserExists,
  middleware.checkStaffAlreadyExistsByEmail,
  userMiddleware.checkEmailExists,
  middleware.checkStaffAlreadyExistsByEmail,
  controller.createCompanyStaff,
);

router.get('/staff/:userId', middleware.validateCompanyStaff, controller.getCompanyStaff);

router.delete(
  '/staff/:userId',
  schemaValidation(deleteCompanyStaffSchema),
  middleware.validateCompanyStaff,
  controller.deleteCompanyStaff,
);

export default router;
