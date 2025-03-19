import { NextFunction, Request, Response } from 'express';

export async function checkRequestIdExist(req: Request, _res: Response, next: NextFunction) {
  return next();
}

export async function checkRequestNameAvailable(req: Request, _res: Response, next: NextFunction) {
  return next();
}
