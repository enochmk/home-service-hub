import { Router } from 'express';
import * as controller from './company-staff.controller';
import schemaValidation from '../../middlewares/schema-validation.middleware';
import { addCompanyStaffSchema, removeCompanyStaffSchema } from './company-staff.schema';
import * as companyMiddleware from '../companies/companies.middleware';
import * as userMiddleware from '../users/users.midddleware';

const router = Router({ mergeParams: true });

router.use(companyMiddleware.checkCompanyExists);

// router.get('/staff', controller.getCompanyStaff);

router.post(
  '/staff',
  schemaValidation(addCompanyStaffSchema),
  userMiddleware.checkUserExists,
  userMiddleware.checkEmailExists,
  controller.addCompanyStaff,
);

// router.get('/staff/:userId', userMiddleware.checkUserExists, controller.getCompanyStaffProfile);

router.delete(
  '/staff/:userId',
  schemaValidation(removeCompanyStaffSchema),
  userMiddleware.checkUserExists,
  controller.removeCompanyStaff,
);

export default router;
