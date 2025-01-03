import rtracer from 'cls-rtracer';
import dayjs from 'dayjs';
import { NextFunction, Request, Response } from 'express';
import { getLogger } from '../utils/logger';
import { redactSensitiveData } from '../utils/helpers';

const logger = getLogger('Request-Logger');

export default async function requestLogger(req: Request, res: Response, next: NextFunction) {
  res.locals.requestId = rtracer.id();
  res.locals.timestamp = dayjs().toISOString();
  res.locals.requestTimestamp = dayjs().toISOString();
  const requestLogDetails = {
    ...res.locals,
    userAgent: req.get('User-Agent') || '',
    referrer: req.get('Referrer') || '',
    headers: req.headers,
    method: req.method,
    url: req.originalUrl,
    data: {
      body: redactSensitiveData(req.body),
      query: redactSensitiveData(req.query),
      params: redactSensitiveData(req.params),
    },
  };
  logger.info('Request received', requestLogDetails);
  next();
}
