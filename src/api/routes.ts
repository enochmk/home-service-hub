import 'express-async-errors';

import { Router } from 'express';
import authRoutes from './auth/auth.routes';
import userRoutes from './users/users.routes';
import roleRoutes from './roles/roles.routes';
import companyRoutes from './companies/companies.routes';
import * as authMiddleware from './auth/auth.middleware';

const router = Router();

// health-check route
router.get('/health', (_req, res) => {
  res.send('OK');
});

router.use('/auth', authRoutes);
router.use(authMiddleware.verifyJWT);
router.use(authMiddleware.validateCurrentUser);
// router.use(authMiddleware.shouldUpdatePassword); redundant middleware
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/companies', companyRoutes);

export default router;
