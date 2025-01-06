import { Router } from 'express';
import * as controller from './company-admins.controller';
import schemaValidation from '../../middlewares/schema-validation.middleware';
import { addCompanyAdminSchema, removeCompanyAdminSchema } from './company-admins.schema';
import { checkCompanyExists } from '../companies/companies.middleware';

const router = Router({ mergeParams: true });

router.use(checkCompanyExists);

router.post('/admin', schemaValidation(addCompanyAdminSchema), controller.addCompanyAdmin);

router.delete('/admin', schemaValidation(removeCompanyAdminSchema), controller.removeCompanyAdmin);

export default router;
