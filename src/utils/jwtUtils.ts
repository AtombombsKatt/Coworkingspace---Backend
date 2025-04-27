import jwt from 'jsonwebtoken';
import { jwtPayload } from '../types/payloadInterface';
import { IUser } from '../models/user';
const JWT_SECRET = process.env.JWT_SECRET || 'mysupersecretmegakey';

export function generateToken (payload: jwtPayload): string {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'});
}

  
export function createJwtPayload(user: IUser): jwtPayload {
    return {
      id: user._id.toString(),
      username: user.username,
      role: user.role,
    };
  }