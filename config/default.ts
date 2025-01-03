import dotenv from 'dotenv';

dotenv.config({
  path: ['.env', '.env.local'],
  override: true,
});

const config = {
  logger: {
    console: true,
    level: 'verbose',
    dirname: process.env.LOG_DIRECTORY || 'logs',
    datePattern: 'YYYYMMDD',
  },
  corsOptions: {
    origin: [`http://localhost:3000`, process.env.ORIGINS],
  },
};

export default config;
