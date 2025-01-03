import { Router } from 'express';

import * as schema from './auth.schema';
import * as controller from './auth.controller';
import * as middleware from './auth.middleware';
import schemaValidation from '../../middlewares/schema-validation.middleware';

const router = Router();
const authRouter = Router();

// /api/v1/auth/*
router.use('/auth', authRouter);

authRouter.post('/sign-in', schemaValidation(schema.signInSchema), controller.signIn);

authRouter.post('/sign-up', schemaValidation(schema.signUpSchema), controller.signUp);

authRouter.post('/sign-out', middleware.verifyJWT, controller.signOut);

authRouter.get('/profile', middleware.verifyJWT, controller.getUserProfile);

authRouter.put(
  '/change-password',
  middleware.verifyJWT,
  schemaValidation(schema.changePasswordSchema),
  controller.changePassword,
);

authRouter.post(
  '/forgot-password',
  schemaValidation(schema.forgotPasswordSchema),
  controller.forgotPassword,
);

authRouter.put(
  '/reset-password/:passwordResetToken',
  schemaValidation(schema.resetPasswordSchema),
  controller.resetPassword,
);

export default router;
