import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'; // Fallback till localhost om miljövariabeln inte finns

const redisClient = createClient({
  url: redisUrl // Använd miljövariabeln från Railway om den är satt
});

redisClient.on('connect', () => {
  console.log('✅ Redis connected');
});

redisClient.on('error', (err) => {
  console.error('❌ Redis Client Error', err);
});

redisClient.connect();

export default redisClient;
