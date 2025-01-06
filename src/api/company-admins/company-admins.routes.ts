import { Router } from 'express';
import * as controller from './company-admins.controller';
import schemaValidation from '../../middlewares/schema-validation.middleware';
import { addCompanyAdminSchema, removeCompanyAdminSchema } from './company-admins.schema';
import * as companyMiddleware from '../companies/companies.middleware';
import * as userMiddleware from '../users/users.midddleware';

const router = Router({ mergeParams: true });

router.use(companyMiddleware.checkCompanyExists);

router.get('/admin', controller.getCompanyAdmins);

router.post(
  '/admin',
  schemaValidation(addCompanyAdminSchema),
  userMiddleware.checkUserExists,
  controller.addCompanyAdmin,
);

router.get('/admin/:userId', userMiddleware.checkUserExists, controller.getCompanyAdminProfile);

router.delete(
  '/admin/:userId',
  schemaValidation(removeCompanyAdminSchema),
  userMiddleware.checkUserExists,
  controller.removeCompanyAdmin,
);

export default router;
