import 'express-async-errors';

import { Router } from 'express';

import healthRouter from './health/health.routes';
import authRouter from './auth/auth.routes';
import userRouter from './users/users.routes';
import roleRouter from './roles/roles.routes';
import userCompanyRouter from './user-company/user-company.routes';
import companyRouter from './companies/companies.routes';
import regionsRouter from './regions/regions.routes';
import locationsRouter from './locations/locations.routes';
import taskTypesRouter from './task-types/task-types.routes';
import statusesRouter from './statuses/statuses.routes';
import tasksRouter from './tasks/tasks.routes';

import * as authMiddleware from './auth/auth.middleware';
import * as userCompanyMiddleware from './user-company/user-company.middleware';

const router = Router();

router.use('/auth', authRouter);
router.use('/health', healthRouter);
router.use(authMiddleware.verifyJWT);
router.use(authMiddleware.validateCurrentUser);
router.use(userCompanyMiddleware.loadCompanies);
router.use(authMiddleware.checkUserCompanyAssociation);
router.use('/users', userRouter);
router.use('/roles', roleRouter);
router.use('/companies/:companyId', userCompanyRouter);
router.use('/companies', companyRouter);
router.use('/regions', regionsRouter);
router.use('/task-types', taskTypesRouter);
router.use('/statuses', statusesRouter);
router.use('/locations', locationsRouter);
router.use('/tasks', tasksRouter);

export default router;
