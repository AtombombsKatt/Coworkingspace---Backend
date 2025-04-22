import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://localhost:6379' // 👈 viktigt!
});

redisClient.on('connect', () => {
  console.log('✅ Redis connected');
});

redisClient.on('error', (err) => {
  console.error('❌ Redis Client Error', err);
});

redisClient.connect();

export default redisClient;
