import 'express-async-errors';

import { Router } from 'express';
import authRoutes from './auth/auth.routes';
import usersRoutes from './users/users.routes';
import rolesRoutes from './roles/roles.routes';
import companyRoutes from './companies/company.routes';
import * as authMiddleware from './auth/auth.middleware';

const router = Router();

// health-check route
router.get('/health', (_req, res) => {
  res.send('OK');
});

router.use('/auth', authRoutes);
router.use(authMiddleware.verifyJWT);
router.use(authMiddleware.validateCurrentUser);
router.use('/users', usersRoutes);
router.use('/roles', rolesRoutes);
router.use('/companies', companyRoutes);

export default router;
