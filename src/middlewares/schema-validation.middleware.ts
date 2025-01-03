import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import createHttpError from 'http-errors';

export default function schemaValidation(schema: AnyZodObject) {
  return async function (req: Request, _res: Response, next: NextFunction) {
    try {
      await schema.parseAsync({
        query: req.query,
        params: req.params,
        body: req.body,
      });
      next();
    } catch (error: any) {
      const errorMessage = 'Schema validation failed';
      throw createHttpError(400, errorMessage, error.errors);
    }
  };
}
