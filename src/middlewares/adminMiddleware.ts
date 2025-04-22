import { Response, NextFunction } from 'express';
import { authenticatedRequest } from '../types/express';
import { ApiError } from '../utils/apiError';

export const requireAdmin = (req: authenticatedRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'Admin') {
    throw new ApiError(403, 'endast admin har tillgång');
  }
  next();
};
