import { Router } from 'express';
import * as controller from './user-company.controller';
import * as middleware from './user-company.middleware';
import schemaValidation from '../../middlewares/schema-validation.middleware';
import { addCompanyUserSchema, removeCompanyUserSchema } from './user-company.schema';
import * as companyMiddleware from '../companies/companies.middleware';
import * as userMiddleware from '../users/users.midddleware';
import { checkPermission } from '../permissions/permissions.middleware';
import { PERMISSIONS } from '../../utils/constants';

const router = Router({ mergeParams: true });

router.use(companyMiddleware.checkCompanyExists);

router.get(
  '/users',
  checkPermission([PERMISSIONS['company.view-users']]),
  controller.getCompanyUsers,
);

router.post(
  '/users',
  schemaValidation(addCompanyUserSchema),
  checkPermission([PERMISSIONS['company.create-users']]),
  userMiddleware.checkUserExistsByParam,
  middleware.isEligibleForCompanyJoin,
  middleware.checkIfUserIsNotAdded,
  controller.addUserToCompany,
);

router.get(
  '/users/:userId',
  checkPermission([PERMISSIONS['company.view-user']]),
  userMiddleware.checkUserExistsByParam,
  controller.getCompanyUserByUserId,
);

router.delete(
  '/users/:userId',
  schemaValidation(removeCompanyUserSchema),
  checkPermission([PERMISSIONS['company.delete-user']]),
  userMiddleware.checkUserExistsByParam,
  middleware.checkIfUserIsAdded,
  controller.removeUserFromCompany,
);

export default router;
