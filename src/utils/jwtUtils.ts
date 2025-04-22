import jwt from 'jsonwebtoken';
import { jwtPayload } from '../types/payloadInterface';
const JWT_SECRET = process.env.JWT_SECRET || 'mysupersecretmegakey';

export function generateToken (payload: jwtPayload): string {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'});
}

  
