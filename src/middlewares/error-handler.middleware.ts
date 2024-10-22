import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';

import { getLogger } from '../libs/logger';
import { DEFAULT_ERROR_MESSAGE } from '../utils/constants';

const logger = getLogger('ErrorHandler');

interface ErrorResponse {
  requestId: string;
  requestTimestamp: string;
  message: string;
}

interface ErrorLog {
  requestId: string;
  requestTimestamp: string;
  error: {
    statusCode?: number;
    name: string;
    message: string;
    code?: string;
    status?: number;
    stack?: any
  };
  endpoint: {
    url: string;
    headers: any;
    method: string;
    body: any;
    params: any;
    query: any;
  };
  response?: any;
}

// eslint-disable-next-line
export default function errorHandler(error: any, req: Request, res: Response, _next: NextFunction) {
  // default error log object
  const errorLog: ErrorLog = {
    requestId: res.locals.requestId,
    requestTimestamp: res.locals.timestamp,
    error: {
      statusCode: 500,
      name: error.name ?? 'UnknownError',
      message: error.message ?? 'No error message provided',
      code: error.code,
      status: error.status,
      stack: error.stack
    },
    endpoint: {
      headers: req.headers ?? {},
      url: req.originalUrl ?? '',
      method: req.method ?? '',
      body: req.body ?? {},
      params: req.params ?? {},
      query: req.query ?? {},
    },
  };

  // Function to create the response object
  const createErrorResponse = (message: string): ErrorResponse => ({
    requestId: res.locals.requestId ?? '',
    requestTimestamp: res.locals.timestamp ?? '',
    message,
  });


  // * Handled API Error
  if (error instanceof HttpError) {
    const response = createErrorResponse(error.message);
    errorLog.response = response;
    errorLog.error.statusCode = error.statusCode;
    logger.warn(error.message, errorLog);
    return res.status(error.statusCode).json(response);
  }

  // ! Unhandled Error
  const response = createErrorResponse(DEFAULT_ERROR_MESSAGE);
  errorLog.response = response;
  errorLog.error.stack = error.stack;
  logger.error(error.message, errorLog);
  return res.status(500).json(response);
}


