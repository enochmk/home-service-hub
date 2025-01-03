import { Request } from 'express';
import { IUserSessionData } from '../api/auth/auth.interface';

declare module 'express-serve-static-core' {
  interface Request {
    user?: IUserSessionData; // You can replace `any` with a more specific type if you know the structure of `user`
  }
}
