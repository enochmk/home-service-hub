import { Router } from 'express';

import * as schema from './users.schema';
import * as controller from './users.controller';
import * as middleware from './users.midddleware';
import * as roleMiddleware from '../roles/roles.middleware';
import schemaValidation from '../../middlewares/schema-validation.middleware';
import { checkPermission } from '../permissions/permissions.middleware';
import { PERMISSIONS } from '../../utils/constants';

const router = Router();

router.get('/', checkPermission([PERMISSIONS['users.list']]), controller.getUsers);

router.post(
  '/',
  schemaValidation(schema.createUserSchema),
  checkPermission([PERMISSIONS['users.create']]),
  middleware.checkEmailExists,
  middleware.authorizeCreateUser,
  controller.createUser,
);

router.get('/me/permissions', controller.getUserPermissionsByRoleId);

router.get(
  '/:userId',
  schemaValidation(schema.getUserSchema),
  checkPermission([PERMISSIONS['users.view']]),
  middleware.checkUserExists,
  middleware.isUserPartOfAdminCompany,
  controller.getUserById,
);

router.put(
  '/:userId',
  schemaValidation(schema.updateUserSchema),
  checkPermission([PERMISSIONS['users.edit']]),
  middleware.checkUserExists,
  middleware.isUserPartOfAdminCompany,
  roleMiddleware.verifyRoleExists,
  controller.updateUserById,
);

router.delete(
  '/:userId',
  schemaValidation(schema.getUserSchema),
  checkPermission([PERMISSIONS['users.delete']]),
  middleware.checkUserExists,
  middleware.isUserPartOfAdminCompany,
  controller.deleteUserById,
);

router.put(
  '/:userId/password',
  schemaValidation(schema.updateUserPasswordSchema),
  checkPermission([PERMISSIONS['users.edit']]),
  middleware.checkUserExists,
  middleware.isUserPartOfAdminCompany,
  roleMiddleware.verifyRoleExists,
  controller.updateUserPasswordByUserId,
);

export default router;
