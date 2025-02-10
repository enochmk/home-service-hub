import { Router } from 'express';

import * as schema from './users.schema';
import * as controller from './users.controller';
import * as middleware from './users.midddleware';
import * as roleMiddleware from '../roles/roles.middleware';
import schemaValidation from '../../middlewares/schema-validation.middleware';
import { checkPermission } from '../permissions/permissions.middleware';
import { PERMISSIONS } from '../../utils/constants';

const router = Router();

// handler to create a new user
router.post(
  '/',
  schemaValidation(schema.createUserSchema),
  checkPermission([PERMISSIONS['users.create']]),
  middleware.checkEmailAvailability,
  middleware.authorizeCreateUser,
  controller.createUser,
);

// handler to get all users
router.get('/', checkPermission([PERMISSIONS['users.list']]), controller.getUsers);

// handler to get a user by :userId
router.get(
  '/:userId',
  schemaValidation(schema.getUserSchema),
  checkPermission([PERMISSIONS['users.view']]),
  middleware.checkUserExists,
  middleware.isUserPartOfAdminCompany,
  controller.getUserById,
);

// handler to update a user by :userId
router.put(
  '/:userId',
  schemaValidation(schema.updateUserSchema),
  checkPermission([PERMISSIONS['users.edit']]),
  middleware.checkUserExists,
  middleware.isUserPartOfAdminCompany,
  roleMiddleware.verifyRoleExists,
  controller.updateUserById,
);

// handler to delete a user by :userId
router.delete(
  '/:userId',
  schemaValidation(schema.getUserSchema),
  checkPermission([PERMISSIONS['users.delete']]),
  middleware.checkUserExists,
  middleware.isUserPartOfAdminCompany,
  controller.deleteUserById,
);

// handler to update a user password by :userId
router.put(
  '/:userId/password',
  schemaValidation(schema.updateUserPasswordSchema),
  checkPermission([PERMISSIONS['users.edit']]),
  middleware.checkUserExists,
  middleware.isUserPartOfAdminCompany,
  roleMiddleware.verifyRoleExists,
  controller.updateUserPasswordByUserId,
);

// handler to get all permissions of current user
router.get('/me/permissions', controller.getUserPermissionsByRoleId);

export default router;
