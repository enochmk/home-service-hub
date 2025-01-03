import 'winston-daily-rotate-file';
import rtracer from 'cls-rtracer';
import config from 'config';
import winston, { format } from 'winston';

const dirname = config.get('logger.dirname') as string;
const LEVEL = config.get('logger.level') as string;
const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const formatter = {
  file: format.printf((log: any): string => {
    const requestId = rtracer.id();
    const { message, level, timestamp, label, ...rest } = log;
    return JSON.stringify({
      timestamp,
      requestId,
      level,
      label,
      message,
      metadata: rest,
    });
  }),
  console: format.printf((log: any): string => {
    const { timestamp, level, message, label, ...rest } = log;
    if (label) {
      return `[${timestamp}][${level?.toUpperCase()}]: [${label}] - ${message} ${
        Object.keys(rest).length ? JSON.stringify(rest) : ''
      }`;
    }
    return `[${timestamp}][${level?.toUpperCase()}]: ${message} ${
      Object.keys(rest).length ? JSON.stringify(rest) : ''
    }`;
  }),
};

const transporter = {
  file: new winston.transports.DailyRotateFile({
    level: LEVEL,
    dirname,
    datePattern: 'YYYYMMDD',
    filename: '%DATE%.log',
    format: winston.format.combine(formatter.file),
  }),
  console: new winston.transports.Console({
    level: 'verbose',
    format: winston.format.combine(formatter.console, winston.format.colorize({ all: true })),
  }),
};

const logger = winston.createLogger({
  transports: [transporter.console, transporter.file],
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({ format: TIMESTAMP_FORMAT }),
    winston.format.errors({ stack: true }),
  ),
});
export const getLogger = (label: string, service?: string) => {
  const childLogger = logger.child({ label });
  if (service) {
    childLogger.defaultMeta = { ...childLogger.defaultMeta, service };
  }
  return childLogger;
};

export default logger;
