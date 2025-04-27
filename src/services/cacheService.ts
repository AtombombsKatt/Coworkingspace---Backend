import redisClient from '../services/redisClient';  

//  hämta data från cache
export const getFromCache = async (key: string) => {
  try {
    const cachedData = await redisClient.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (error) {
    console.error('Fel vid hämtning från cache', error);
    return null; 
  }
};

//  spara data till cache
export const saveToCache = async (key: string, data: any, expiration = 3600) => {
  try {
    await redisClient.setEx(key, expiration, JSON.stringify(data));
  } catch (error) {
    console.error('Fel vid lagring i cache', error);
  }
};

//  ta bort data från cache
export const deleteFromCache = async (key: string) => {
  try {
    await redisClient.del(key);
  } catch (error) {
    console.error('Fel vid borttagning från cache', error);
  }
};
