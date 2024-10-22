import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

import { getLogger } from '../libs/logger';

const logger = getLogger('ValidatorMiddleware');

export default function validatorMiddleware(schema: AnyZodObject) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const data = {
      query: req.query,
      params: req.params,
      body: req.body,
    };

    try {
      await schema.parseAsync(data);
      return next();
    } catch (error: any) {
      logger.warn('Request Validation failed', { error: error.errors });
      return res
        .status(400)
        .json({ message: 'Request validation failed. Please check request and try again', error });
    }
  };
};

