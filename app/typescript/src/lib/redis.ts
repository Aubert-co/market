import { createClient, RedisClientType } from 'redis';

const REDIS_URL = process.env.REDIS_URL
if(!REDIS_URL){
    throw new Error('Undefined redis url');
}
const redis: RedisClientType = createClient({
    url: REDIS_URL,
});

redis.on('error', (err) => {
  console.error('Redis error:', err); 
});

let isConnected = false;

export const connectRedis = async () => {
  if (!isConnected) {
    try {
      await redis.connect();
      isConnected = true;
    } catch (err) {
      throw new Error('Erro ao conectar ao Redis: ' + (err instanceof Error ? err.message : String(err)));
    }
  }
};

export default redis;
