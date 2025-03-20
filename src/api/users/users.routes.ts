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
router.get(
  '/',
  checkPermission([PERMISSIONS['users.list']]),
  controller.getAllUsers,
);

// handler to get a user by :userId
router.get(
  '/:userId',
  schemaValidation(schema.getUserSchema),
  checkPermission([PERMISSIONS['users.view']]),
  middleware.checkUserExistsByParam,
  middleware.isPartOfAdminCompany,
  controller.getUserById,
);

// handler to update a user details by :userId
router.put(
  '/:userId',
  schemaValidation(schema.updateUserSchema),
  checkPermission([PERMISSIONS['users.edit']]),
  middleware.checkUserExistsByParam,
  middleware.isPartOfAdminCompany,
  roleMiddleware.verifyRoleExists,
  middleware.checkEmailAvailability,
  controller.updateUserById,
);

// handler to delete a user by :userId
router.delete(
  '/:userId',
  schemaValidation(schema.getUserSchema),
  checkPermission([PERMISSIONS['users.delete']]),
  middleware.checkUserExistsByParam,
  middleware.isPartOfAdminCompany,
  controller.deleteUserById,
);

// handler to update a user password by :userId
router.put(
  '/:userId/password',
  schemaValidation(schema.updateUserPasswordSchema),
  checkPermission([PERMISSIONS['users.edit']]),
  middleware.checkUserExistsByParam,
  middleware.isPartOfAdminCompany,
  roleMiddleware.verifyRoleExists,
  controller.changeUserPassword,
);

export default router;
