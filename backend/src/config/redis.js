 import dotenv from 'dotenv';
dotenv.config();

 
 import Redis from 'ioredis'
 import {logger} from './logger.js'

 const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'
 console.log('Loaded REDIS_URL:', redisUrl);

 // Auto-detect TLS for Cloud Redis (Upstash)
const isCloudRedis = redisUrl.startsWith('rediss://');

 export const redis = new Redis(redisUrl, {
    lazyConnect: true,
    maxRetriesPerRequest: 3,
    family: 4,
    ...(isCloudRedis && {
        tls:{
            rejectUnauthorized: false,
            servername: new URL(redisUrl).hostname,
        },
    }),

    retryStrategy:(times) => {
        if(times > 3){
            return null // Stop retrying after 3 attempts
        }
        return Math.min(times * 100, 2000);
    }
 });

 redis.on('connect', () => {
    logger.info('Connected to redis successfully');
 });

 redis.on('error', (err) => {
logger.error(`Redis connection error: ${err.message}`)
 });

 export const connectRedis = async () => {
    try{
     await redis.connect()
    }catch(error){
        // Error silently log hoga, server crash nahi hoga
        logger.warn(`Redis failed to connect. Running app without cache: ${error.message}`);
    }
 }