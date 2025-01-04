import { Router } from 'express';

import * as schema from './users.schema';
import * as controller from './users.controller';
import * as middleware from './users.midddleware';
import schemaValidation from '../../middlewares/schema-validation.middleware';

const router = Router();

// get all users
router.get('/', controller.getUsers);

// create a new user
router.post(
  '/',
  schemaValidation(schema.createUserSchema),
  middleware.verifyEmailAvailability,
  controller.createUser,
);

// get current user profile
router.get('/me', controller.getProfile);

// get current user permissions
router.get('/me/permissions', controller.getUserPermissions);

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
  middleware.verifyUserExists,
  controller.getUser,
);

// update specified user :userId details <optional>
router.put(
  '/:userId',
  schemaValidation(schema.updateUserSchema),
  middleware.verifyUserExists,
  controller.updateUser,
);

// delete specified user :userId
router.delete(
  '/:userId',
  schemaValidation(schema.getUserSchema),
  middleware.verifyUserExists,
  controller.deleteUser,
);

// update specified user :userId password
router.put(
  '/:userId/password',
  schemaValidation(schema.updateUserPasswordSchema),
  controller.updateUserPassword,
);

export default router;
