import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtPayload } from '../types/payloadInterface';
import { authenticatedRequest } from '../types/express';
import { ApiError } from '../utils/apiError';

const JWT_SECRET = process.env.JWT_SECRET || 'mysupersecretmegakey';

export const validateToken = (req: authenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('bearer ')) { //prefix grejjen för undefined
    throw new ApiError(401, 'Token saknas eller är felaktigt formaterad');
  }
  
  const token = authHeader.split(' ')[1];
  
  // const token = authHeader && authHeader.split(' ')[1]; 
  // console.log("Authorization header:", authHeader);
  // console.log("Token:", token);


  if (!token) {
    throw new ApiError(401, 'Stopp i lagens namn! ingen token skickades 👮');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    throw new ApiError(401, 'Ogiltig token');
  }
};
