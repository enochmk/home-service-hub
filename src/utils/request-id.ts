import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { AsyncLocalStorage } from 'node:async_hooks';
import logger from './logger';

const asyncLocalStorage = new AsyncLocalStorage<{ requestId: string }>();

// Middleware to Initialize AsyncLocalStorage
export function generateRequestId(req: Request, res: Response, next: NextFunction) {
  const requestId = uuidv4();
  asyncLocalStorage.run({ requestId }, () => {
    req['requestId'] = requestId; // Attach it to the request object
    req['requestTimestamp'] = new Date().toISOString();
    res.setHeader('X-Request-ID', requestId);
    next();
  });
}

// Helper to Get Request ID
export function getRequestId(): string | undefined {
  const store = asyncLocalStorage.getStore();
  return store?.requestId;
}

// Middleware for Request & Response Logging
export function captureRequestResponseDetails(req: Request, res: Response, next: NextFunction) {
  const requestId = req['requestId'];
  const startTime = Date.now();

  // Capture request details
  const requestDetails = {
    requestId,
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    params: req.params,
    query: req.query,
    body: req.body,
  };

  // Store the original res.send method
  const oldSend = res.send;

  // Override res.send to capture the response body
  res.send = function (body) {
    const stopTime = Date.now();
    const responseTime = stopTime - startTime;

    // Capture response details
    const responseDetails = {
      timestamp: new Date().toISOString(),
      statusCode: res.statusCode,
      // headers: res.getHeaders(),
      body: JSON.parse(body), // Capture the response body
    };

    // Log the combined request and response
    logger.info(`[${res.statusCode}] Request-Response Log`, {
      requestId,
      request: requestDetails,
      response: responseDetails,
      responseTime: `${responseTime}ms`,
    });

    // Call the original res.send with the body
    return oldSend.call(this, body);
  };

  next();
}
