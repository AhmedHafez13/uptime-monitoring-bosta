import { UserAttributes } from '@app/api/users/user.model';

declare module 'express' {
  interface Request {
    userData?: UserAttributes;
    user?: {
      _id?: string;
      email?: string;
    };
  }
}
