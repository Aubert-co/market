import IORedis from 'ioredis'

import {Queue} from 'bullmq'

if(!process.env.REDIS_URL)throw new Error('no redis url');
const REDIS_URL = process.env.REDIS_URL
export const connection = new IORedis( REDIS_URL,{maxRetriesPerRequest:null})

export const deleteProductQueue = new Queue('delete-product',{connection})