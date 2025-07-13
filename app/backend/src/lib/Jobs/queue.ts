import IORedis from 'ioredis'

import {Queue} from 'bullmq'
const REDIS_URL = process.env.REDIS_URL;
if (!REDIS_URL) {
  throw new Error('Undefined redis url'+process.env.REDIS_URL);
}
export const connection = new IORedis( REDIS_URL)

export const deleteProductQueue = new Queue('delete-product',{connection})