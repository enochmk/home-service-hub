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
  ldap: {
    url: process.env.LDAP_URI as string,
    baseDN: process.env.LDAP_BASEDN as string,
    username: process.env.LDAP_USERNAME as string,
    password: process.env.LDAP_PASSWORD as string,
  },
  disableInternalSystem: false,
};

export default config;
