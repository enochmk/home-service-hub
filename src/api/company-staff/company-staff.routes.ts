import { Router } from 'express';
import * as controller from './company-staff.controller';
import schemaValidation from '../../middlewares/schema-validation.middleware';
import {
  createCompanyStaffSchema,
  deleteCompanyStaffSchema,
  updateCompanyStaffSchema,
} from './company-staff.schema';
import * as companyMiddleware from '../companies/companies.middleware';
import * as userMiddleware from '../users/users.midddleware';
import * as middleware from './company-staff.middleware';

const router = Router({ mergeParams: true });

// Check if company exists
router.use(companyMiddleware.checkCompanyExists);

router.get('/staff', controller.getCompanyStaff);

// create a company staff
router.post(
  '/staff',
  schemaValidation(createCompanyStaffSchema),
  userMiddleware.checkEmailExists,
  middleware.checkUserNotAddedByEmail,
  controller.createCompanyStaff,
);

router.get('/staff/:userId', middleware.checkIfUserIsCompanyStaff, controller.getCompanyStaff);

router.put(
  '/staff/:userId',
  schemaValidation(updateCompanyStaffSchema),
  middleware.checkIfUserIsCompanyStaff,
  controller.updateCompanyStaff,
);

router.delete(
  '/staff/:userId',
  schemaValidation(deleteCompanyStaffSchema),
  middleware.checkIfUserIsCompanyStaff,
  controller.deleteCompanyStaff,
);

export default router;
