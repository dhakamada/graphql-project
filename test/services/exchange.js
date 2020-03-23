import axios from 'axios'
import faker from 'faker/locale/pt_BR'

import Exchange from '../../src/services/exchange'

jest.mock('axios')

describe('Exhange Service', () => {
  describe('constructor', () => {
    it('should successfully set default parameters', () => {
      const defaultParameters = { host: 'host'}
      const defaultExchange = new Exchange(defaultParameters)

      expect(defaultExchange.host).toEqual(defaultParameters.host)
      expect(defaultExchange.timeout).toEqual(5000)
      expect(defaultExchange.base).toEqual('BRL')
    })

    it('should successfully set parameters', () => {
      const parameters = { host: 'host', timeout: 10, base: 'USD' }
      const exchange = new Exchange(parameters)

      expect(exchange.host).toEqual(parameters.host)
      expect(exchange.timeout).toEqual(parameters.timeout)
      expect(exchange.base).toEqual(parameters.base)
    })

    it('should successfully set parameters from envVar', () => {
      process.env.EXCHANGE_API_TIMEOUT = 10000
      process.env.EXCHANGE_API_BASE_DEFAULT = 'EUR'

      const parameters = { host: 'host'}
      const exchange = new Exchange(parameters)

      expect(exchange.host).toEqual(parameters.host)
      expect(exchange.timeout).toEqual(parseInt(process.env.EXCHANGE_API_TIMEOUT))
      expect(exchange.base).toEqual(process.env.EXCHANGE_API_BASE_DEFAULT)
    })
  })

  describe('fetchExchangeRate', () => {
    it('should succesfully fetch exchange rate', async () => {
      const resultFaker = { data: { isFetch: true }}
      axios.get = jest.fn().mockResolvedValue(resultFaker)

      const exchange = new Exchange({ host: faker.internet.url() })
      const result = await exchange.fetchExchangeRate()

      expect(result).toEqual(resultFaker.data)
    })
  })
})
