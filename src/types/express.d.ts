import { IUserSessionData } from '../api/auth/auth.interface';

declare global {
  namespace Express {
    interface Locals {
      user?: IUserSessionData;
      company?: {
        id: int;
        name: string;
      };
    }
  }
}
