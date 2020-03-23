import Redis from './redis'
import ioredis from 'ioredis'

export const redisClient = new Redis(ioredis).getClient()