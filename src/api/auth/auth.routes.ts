import { Router } from 'express';

import * as schema from './auth.schema';
import * as controller from './auth.controller';
import * as middleware from './auth.middleware';
import schemaValidation from '../../middlewares/schema-validation.middleware';
import * as companyAdminMiddleware from '../user-company/user-company.middleware';

const router = Router();

// user sign-in
router.post(
  '/sign-in',
  schemaValidation(schema.signInSchema),
  controller.signIn,
);

// user sign-up
router.post(
  '/sign-up',
  schemaValidation(schema.signUpSchema),
  controller.signUp,
);

// user sign-out
router.post('/sign-out', middleware.verifyJWT, controller.signOut);

// user trigger forgot password
router.post(
  '/forgot-password',
  schemaValidation(schema.forgotPasswordSchema),
  controller.forgotPassword,
);

// user reset password
router.put(
  '/reset-password/:passwordResetToken',
  schemaValidation(schema.resetPasswordSchema),
  controller.resetPassword,
);

// user change own password
router.put(
  '/change-password',
  schemaValidation(schema.changeOwnPasswordSchema),
  middleware.verifyJWT,
  middleware.validateCurrentUser,
  controller.changeOwnPassword,
);

// get current user profile
router.get(
  '/me',
  middleware.verifyJWT,
  middleware.validateCurrentUser,
  companyAdminMiddleware.loadCompanies,
  controller.getProfile,
);

// get current user permissions
router.get(
  '/permissions',
  middleware.verifyJWT,
  middleware.validateCurrentUser,
  controller.getPermissions,
);

export default router;
