import Redis from '../../src/infrastructure/redis'
import EvetnEmitter from 'events'

class RedisLibFaker extends EvetnEmitter {
  constructor(params) {
    super()
    this.params = params
  }
}

describe('RedisFactory', () => {
  describe('getClient', () => {
    it ('should successfully get redis client', () => {
      const redis = new Redis(RedisLibFaker)

      const client = redis.getClient()
      
      expect(client).not.toBeNull()
      expect(client).toBeInstanceOf(RedisLibFaker)
      expect(client.params.maxRetriesPerRequest).toEqual(0)
      expect(client.params.retryStrategy()).toEqual(500)
    })

    it ('should return the same client if there is one', () => {
      const redis = new Redis(RedisLibFaker)

      const client = redis.getClient()
      const clientNew = redis.getClient()
      
      expect(client).not.toBeNull()
      expect(clientNew).not.toBeNull()
      expect(client).toEqual(clientNew)
    })

    it ('should check error event', () => {
      const redis = new Redis(RedisLibFaker)
      
      const client = redis.getClient()

      expect(client).not.toBeNull()
      expect(client.clientConnected).not.toBeTruthy()
      client.emit('connect')
      expect(client.clientConnected).toBeTruthy()
      client.emit('error')
      expect(client.clientConnected).not.toBeTruthy()
    })
  })
})
