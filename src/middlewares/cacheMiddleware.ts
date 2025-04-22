import { Request, Response, NextFunction } from 'express';
import redisClient from '../services/redisClient';  // Importera din Redis-klient

// Cache middleware för GET , consols för o se om cache hittas
export const cacheMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const key = `cache:${req.originalUrl}`;  // Skapar en nyckel baserat på URL

  try {
    const cachedData = await redisClient.get(key);  

    if (cachedData) {
      console.log(`🔁 Cacheträff för ${req.originalUrl}`);
      res.json(JSON.parse(cachedData));  
      return;
    }

    console.log(`🚫 Ingen cacheträff för ${req.originalUrl}`);
    next();  
  } catch (error) {
    console.error('Redis cache error:', error);
    next(); 
  }
};


