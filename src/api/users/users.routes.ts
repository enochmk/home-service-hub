import { Router } from 'express';

import * as schema from './users.schema';
import * as controller from './users.controller';
import * as middleware from './users.midddleware';
import * as roleMiddleware from '../roles/roles.middleware';
import schemaValidation from '../../middlewares/schema-validation.middleware';
import { checkPermission } from '../permissions/permissions.middleware';
import { PERMISSIONS } from '../../utils/constants';

const router = Router();

// get all users
router.get('/', checkPermission([PERMISSIONS['users.list']]), controller.getUsers);

// create a new user
router.post(
  '/',
  schemaValidation(schema.createUserSchema),
  checkPermission([PERMISSIONS['users.create']]),
  middleware.checkEmailExists,
  roleMiddleware.verifyRoleExists,
  controller.createUser,
);

// get current user profile
router.get('/me', controller.getProfile);

// get current user permissions
router.get('/me/permissions', controller.getUserPermissionsByRoleId);

// change current user password
router.put(
  '/me/change-password',
  schemaValidation(schema.changeOwnPasswordSchema),
  controller.changeOwnPassword,
);

// get specified user :userId
router.get(
  '/:userId',
  schemaValidation(schema.getUserSchema),
  checkPermission([PERMISSIONS['users.view']]),
  middleware.checkUserExists,
  controller.getUserById,
);

// update specified user :userId details <optional>
router.put(
  '/:userId',
  schemaValidation(schema.updateUserSchema),
  checkPermission([PERMISSIONS['users.edit']]),
  middleware.checkUserExists,
  roleMiddleware.verifyRoleExists,
  controller.updateUserById,
);

// delete specified user :userId
router.delete(
  '/:userId',
  schemaValidation(schema.getUserSchema),
  checkPermission([PERMISSIONS['users.delete']]),
  middleware.checkUserExists,
  controller.deleteUserById,
);

// update specified user :userId password
router.put(
  '/:userId/password',
  schemaValidation(schema.updateUserPasswordSchema),
  checkPermission([PERMISSIONS['users.edit']]),
  middleware.checkUserExists,
  roleMiddleware.verifyRoleExists,
  controller.updateUserPasswordByUserId,
);

export default router;
