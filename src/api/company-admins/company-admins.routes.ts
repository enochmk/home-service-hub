import { Router } from 'express';
import * as controller from './company-admins.controller';
import schemaValidation from '../../middlewares/schema-validation.middleware';
import { addCompanyAdminSchema, removeCompanyAdminSchema } from './company-admins.schema';
import { checkCompanyExists } from '../companies/companies.middleware';
import { checkUserExists } from '../users/users.midddleware';

const router = Router({ mergeParams: true });

router.use(checkCompanyExists);

router.get('/admin', controller.getCompanyAdmins);

router.post('/admin', schemaValidation(addCompanyAdminSchema), controller.addCompanyAdmin);

router.get('/admin/:userId', checkUserExists, controller.getCompanyAdminProfile);

router.delete(
  '/admin/:userId',
  schemaValidation(removeCompanyAdminSchema),
  checkUserExists,
  controller.removeCompanyAdmin,
);

export default router;
