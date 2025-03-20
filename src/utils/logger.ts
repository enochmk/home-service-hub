import 'winston-daily-rotate-file';
import rtracer from 'cls-rtracer';
import config from 'config';
import winston, { format } from 'winston';
import { redactSensitiveData } from './helpers';

const dirname = config.get('logger.dirname') as string;
const LEVEL = config.get('logger.level') as string;
const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const formatter = {
  file: format.printf((log: any): string => {
    const requestId = rtracer.id();
    const {
      message,
      level,
      timestamp,
      label,
      user, // Include user details in the log
      ...rest
    } = log;
    return JSON.stringify({
      timestamp,
      requestId,
      level,
      label,
      user, // Include user details in the log
      message,
      metadata: redactSensitiveData(rest),
    });
  }),
  console: format.printf((log: any): string => {
    const { timestamp, level, message, label, user, ...rest } = log;
    const userInfo = user ? `[User: ${user.email || user.id}] ` : '';
    const restInfo = Object.keys(rest).length ? JSON.stringify(rest) : '';
    const baseLog = `[${timestamp}][${level?.toUpperCase()}]: ${message} ${userInfo} ${restInfo}`;
    return label
      ? `[${timestamp}][${level?.toUpperCase()}]: ${userInfo}[${label}] - ${message} ${restInfo}`
      : baseLog;
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
    format: winston.format.combine(
      formatter.console,
      winston.format.colorize({ all: true }),
    ),
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
