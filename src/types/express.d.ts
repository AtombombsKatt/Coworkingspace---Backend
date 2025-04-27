import { Request } from 'express';
import { jwtPayload } from './payloadInterface';

export interface authenticatedRequest extends Request {
  user?: jwtPayload;
}
