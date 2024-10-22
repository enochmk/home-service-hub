import rtracer from 'cls-rtracer';
import dayjs from 'dayjs';
import { NextFunction, Request, Response } from 'express';

import { getLogger } from '../libs/logger';

const logger = getLogger('LoggerMiddleware');

export default async function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  res.locals.requestID = rtracer.id();
  res.locals.timestamp = dayjs().toISOString();

  const logInfo = {
    requestID: res.locals.requestID,
    timestamp: res.locals.timestamp,
    headers: req.headers,
    method: req.method,
    url: req.originalUrl,
    params: req.params,
    query: req.query,
    body: req.body,
  };

  logger.info(logInfo);
  return next();
};

