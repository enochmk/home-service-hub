import fs from 'fs';
import { join } from 'path';
import { readdir } from 'fs/promises';
import { Router } from 'express';

export function redactSensitiveData(body: any): any {
  const sensitiveFields = ['password', 'confirm-password', 'token', 'pin'];
  function redact(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
    const redactedObj = Array.isArray(obj) ? [] : {};
    Object.keys(obj).forEach((key) => {
      if (sensitiveFields.includes(key.toLowerCase())) {
        redactedObj[key] = 'REDACTED';
      } else {
        redactedObj[key] = redact(obj[key]);
      }
    });
    return redactedObj;
  }
  return redact(body);
}

export async function registerApiRoutesFromDir(router: Router, dir: string) {
  if (!fs.existsSync(dir)) return;
  const files = await readdir(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = join(dir, file.name);
    if (file.isDirectory()) {
      await registerApiRoutesFromDir(router, fullPath);
    } else if (file.isFile() && file.name.endsWith('.routes.ts')) {
      const route = await import(fullPath);
      if (route.default) {
        router.use(route.default);
      }
    }
  }
}
