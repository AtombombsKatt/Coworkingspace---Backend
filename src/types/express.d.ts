import { Request } from 'express';
import { jwtPayload } from './payloadInterface';

export interface authenticatedRequest extends Request {
  // user?: {
  //   id: string;
  //   username: string;
  //   role: 'User' | 'Admin';
  // };
  user?: jwtPayload;
}
