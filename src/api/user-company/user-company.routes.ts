import { Router } from 'express';
import * as controller from './user-company.controller';
import * as middleware from './user-company.middleware';
import schemaValidation from '../../middlewares/schema-validation.middleware';
import { addCompanyAdminSchema, removeCompanyAdminSchema } from './user-company.schema';
import * as companyMiddleware from '../companies/companies.middleware';
import * as userMiddleware from '../users/users.midddleware';

const router = Router({ mergeParams: true });

router.use(companyMiddleware.checkCompanyExists);

router.get('/admins', controller.getCompanyAdmins);

router.post(
  '/admins',
  schemaValidation(addCompanyAdminSchema),
  userMiddleware.checkUserExists,
  middleware.isUserCompanyAdmin,
  middleware.checkIfUserIsNotAdded,
  controller.addCompanyAdmin,
);

router.get('/admins/:userId', userMiddleware.checkUserExists, controller.getCompanyAdmin);

router.delete(
  '/admins/:userId',
  schemaValidation(removeCompanyAdminSchema),
  userMiddleware.checkUserExists,
  middleware.checkIfUserIsAdded,
  controller.removeCompanyAdmin,
);

export default router;
