import { Router } from 'express';
import * as controller from './user-company.controller';
import * as middleware from './user-company.middleware';
import schemaValidation from '../../middlewares/schema-validation.middleware';
import { addCompanyUserSchema, removeCompanyUserSchema } from './user-company.schema';
import * as companyMiddleware from '../companies/companies.middleware';
import * as userMiddleware from '../users/users.midddleware';

const router = Router({ mergeParams: true });

router.use(companyMiddleware.checkCompanyExists);

router.get('/users', controller.getCompanyUsers);

router.post(
  '/users',
  schemaValidation(addCompanyUserSchema),
  userMiddleware.checkUserExists,
  middleware.isEligibleForCompanyJoin,
  middleware.checkIfUserIsNotAdded,
  controller.addUserToCompany,
);

router.get('/users/:userId', userMiddleware.checkUserExists, controller.getCompanyUserByUserId);

router.delete(
  '/users/:userId',
  schemaValidation(removeCompanyUserSchema),
  userMiddleware.checkUserExists,
  middleware.checkIfUserIsAdded,
  controller.removeUserFromCompany,
);

export default router;
