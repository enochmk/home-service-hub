import { NextFunction, Request } from 'express';
import { HttpError } from 'http-errors';
import { getLogger } from '../utils/logger';
import { ErrorLog, ErrorResponse } from '../types/common';

const logger = getLogger('Error-Handler');

export const DEFAULT_ERROR_MESSAGE =
  'An unexpected error occurred. Please try again later or contact support if the issue persists.';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function errorHandler(error: any, req: Request, res: any, _next: NextFunction) {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(error);
  }

  // default error log object
  const errorLog: ErrorLog = {
    ...res.locals,
    error: {
      statusCode: 500,
      name: error.name,
      message: error.message,
      code: error.code,
      status: error.status,
      stack: error.stack,
    },
    requestDetails: {
      headers: req.headers,
      url: req.originalUrl,
      method: req.method,
      query: req.query,
      params: req.params,
      body: req.body,
    },
  };

  // Function to create the response object
  const createErrorResponse = (message: string): ErrorResponse => ({
    requestId: res.locals.requestId,
    // requestTimestamp: res.locals.requestTimestamp,
    message,
  });

  // * Handled API Error
  if (error instanceof HttpError) {
    const response = createErrorResponse(error.message);
    errorLog.response = response;
    errorLog.error.statusCode = error.statusCode;
    logger.warn(error.message, errorLog);
    res.status(error.statusCode).json(response);
    return;
  }

  // ! Unhandled Error
  const response = createErrorResponse(DEFAULT_ERROR_MESSAGE);
  errorLog.response = response;
  errorLog.error.stack = error.stack;
  logger.error(error.message, errorLog);
  res.status(500).json(response);
  return;
}
