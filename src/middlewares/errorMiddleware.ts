import { Request, Response, NextFunction } from 'express';
import logger from '../utils/winstonLogger';

//error middleware för att fånga generella fel och logga samt ett stacktrace
export const errorMiddleware = (err: Error & { statusCode?: number }, req: Request, res: Response, next: NextFunction) => {

  logger.error(`Fel vid ${req.method} ${req.originalUrl}: ${err.message}`);
  logger.error(`Stacktrace: ${err.stack}`);


  const statusCode = err.statusCode || 500;
  const message = err.message || 'Något gick fel på servern';

  
  res.status(statusCode).json({ message });
};
