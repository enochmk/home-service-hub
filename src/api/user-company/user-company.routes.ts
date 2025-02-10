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

// Add user to company
router.post(
  '/users',
  schemaValidation(addCompanyUserSchema),
  checkPermission([PERMISSIONS['company.create-users']]),
  userMiddleware.checkUserExists,
  middleware.isEligibleForCompanyJoin,
  middleware.checkIfUserIsNotAdded,
  controller.addUserToCompany,
);

// Get company users
router.get(
  '/users',
  checkPermission([PERMISSIONS['company.view-users']]),
  controller.getCompanyUsers,
);

// Get company user by userId
router.get(
  '/users/:userId',
  checkPermission([PERMISSIONS['company.view-user']]),
  userMiddleware.checkUserExistsByParam,
  controller.getCompanyUserByUserId,
);

// Remove user from company
router.delete(
  '/users/:userId',
  schemaValidation(removeCompanyUserSchema),
  checkPermission([PERMISSIONS['company.delete-user']]),
  userMiddleware.checkUserExistsByParam,
  middleware.checkIfUserIsAdded,
  controller.removeUserFromCompany,
);

export default router;
