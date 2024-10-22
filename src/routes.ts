import 'express-async-errors';

import { Router } from 'express';


import verifyJWT from './middlewares/jwt.middleware';

const router = Router();

router.use(verifyJWT); // private routes

router.get('/health-check', (req, res) => {
  res.status(200).json({ message: 'Server is up and running!' });
})

export default router;
