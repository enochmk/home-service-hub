import 'express-async-errors';

import { Router } from 'express';
import { join } from 'path';
import { registerApiRoutesFromDir } from './utils/helpers';

const router = Router();

// health-check route
router.get('/health', (_req, res) => {
  res.send('OK');
});

const apiRoutesPath = join(__dirname, 'api');
registerApiRoutesFromDir(router, apiRoutesPath);

export default router;
