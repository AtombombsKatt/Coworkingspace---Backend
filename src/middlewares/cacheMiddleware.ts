
import { Request, Response, NextFunction } from 'express';
import redisClient from '../services/redisClient';  // Importera din Redis-klient

// Cache middleware för GET-begärningar
export const cacheMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const key = `cache:${req.originalUrl}`;  // Skapar en nyckel baserat på URL

  try {
    const cachedData = await redisClient.get(key);  // Försök att hämta data från Redis-cachen

    if (cachedData) {
      console.log(`🔁 Cacheträff för ${req.originalUrl}`);
      res.json(JSON.parse(cachedData));  // Returnera cachad data om den finns
      return;
    }

    console.log(`🚫 Ingen cacheträff för ${req.originalUrl}`);
    next();  // Fortsätt om cache inte finns
  } catch (error) {
    console.error('Redis cache error:', error);
    next();  // Fortsätt även om det sker ett fel med Redis
  }
};

