import { NextFunction, Request, Response } from 'express';

export async function checkStatusIdExist(req: Request, _res: Response, next: NextFunction) {
  return next();
}

export async function checkStatusNameAvailable(req: Request, _res: Response, next: NextFunction) {
  return next();
}
