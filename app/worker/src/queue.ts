import IORedis from 'ioredis'

import {Queue} from 'bullmq'

const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
  throw new Error('❌ Variável de ambiente REDIS_URL não definida.');
}

export const connection = new IORedis( REDIS_URL,{maxRetriesPerRequest:null})

export const deleteProductQueue = new Queue('delete-product',{connection})