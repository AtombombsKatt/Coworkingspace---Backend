import { Request, Response, NextFunction } from 'express';
import logger from '../utils/winstonLogger';

// Custom error handler middleware
export const errorMiddleware = (err: Error & { statusCode?: number }, req: Request, res: Response, next: NextFunction) => {
  // Logga mer detaljer om felet (inklusive stack-trace) och url
  logger.error(`Fel vid ${req.method} ${req.originalUrl}: ${err.message}`);
  logger.error(`Stacktrace: ${err.stack}`);

  // Fallback statuskod och meddelande
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Något gick fel på servern';

  // Skicka tillbaka ett felmeddelande till klienten
  res.status(statusCode).json({ message });
};
