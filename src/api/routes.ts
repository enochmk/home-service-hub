import 'express-async-errors';

import { Router } from 'express';

import authRoutes from './auth/auth.routes';
import userRoutes from './users/users.routes';
import roleRoutes from './roles/roles.routes';
import userCompanyRoutes from './user-company/user-company.routes';
import companyRoutes from './companies/companies.routes';

import * as authMiddleware from './auth/auth.middleware';
import * as userCompanyMiddleware from './user-company/user-company.middleware';

const router = Router();

// health-check route
router.get('/health', (_req, res) => {
  res.send('OK');
});

router.use('/auth', authRoutes);
router.use(authMiddleware.verifyJWT);
router.use(authMiddleware.validateCurrentUser);
router.use(userCompanyMiddleware.loadCompanies);
router.use(authMiddleware.checkUserCompanyAssociation);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/companies/:companyId', userCompanyRoutes);
router.use('/companies', companyRoutes);

export default router;
