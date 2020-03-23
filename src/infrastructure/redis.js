import logger from '../config/logger'

export default class Redis {
  constructor(redisLib) {
    this.redisLib = redisLib
    this.client = null
    this.clientConnected = false
  }

  getClient() {
    if (!this.client) this.client = new this.redisLib({
      host: process.env.CACHE_HOST || 'locahost',
      maxRetriesPerRequest: 0,
      retryStrategy: function() {
        return 500;
      }
    })

    this.client.on('error', function () {
      logger.error('Error on redis connection...')
      this.clientConnected = false
    })

    this.client.on('connect', function () {
      logger.info('redis connected')
      this.clientConnected = true
    })
    
    return this.client
  }
}