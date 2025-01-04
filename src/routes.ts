import 'express-async-errors';

import { Router } from 'express';
import authRoutes from './api/auth/auth.routes';
import usersRoutes from './api/users/users.routes';
import * as authMiddleware from './api/auth/auth.middleware';

const router = Router();

// health-check route
router.get('/health', (_req, res) => {
  res.send('OK');
});

router.use('/auth', authRoutes);
router.use(authMiddleware.verifyJWT);
router.use(authMiddleware.validateCurrentUser);
router.use('/users', usersRoutes);

export default router;
