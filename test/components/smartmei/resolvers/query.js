import { fetchCommercialPlanFallBack, fetchCommercialPlan } from '../../../../src/components/smartmei/resolvers/query'

describe('Query', () => {
  const site = 'https://www.smartmei.com.br/#planos-e-tarifas'
  const expectedResult = {'description': 'description', 'eurPrice': '€ 1.30', 'queryDate': '2020-03-22 20:15:20', 'realPrice': '7.00', 'usdPrice': '$ 1.39'}

  describe('fetchCommercialPlanFallBack', () => {
    const performCrawlerMock = jest.fn().mockResolvedValue(
      { description: 'description', price: '7.00', queryDate: '2020-03-22 20:15:20' }
    )
    const exchangeServiceFake = {
      fetchExchangeRate() {
        return Promise.resolve({ rates })
      }
    }

    const rates = {
      'EUR': 0.1854014869,
      'USD': 0.198509372
    }

    it(`should return null if performCrawler is empty`, async () => {
      const result = await fetchCommercialPlanFallBack()()
      
      expect(result).toBeNull()
    })

    it(`should successfully return fallback data`, async () => {
      const result = await fetchCommercialPlanFallBack(
        performCrawlerMock, exchangeServiceFake
      )(site)
      
      expect(result).not.toBeNull()
      expect(result).toEqual(expectedResult)
      expect(performCrawlerMock.mock.calls[0][0]).toEqual(site)
    })
  })

  describe('fetchCommercialPlan', () => {
    let fallBackFnMock, getMock, ctx

    beforeEach(() => {
      fallBackFnMock = jest.fn().mockResolvedValue(true)
      getMock = jest.fn()
      ctx = {
        redisClient: {
          get: getMock
        }
      }
    })

    it('should call fallBack if cannot get data in cache', async () => {
      getMock.mockRejectedValue(new Error('Cache error'))
      const result = await fetchCommercialPlan(fallBackFnMock)({}, { site }, ctx)

      expect(result).toBeTruthy()
      expect(getMock).toHaveBeenCalledTimes(1)
      expect(fallBackFnMock).toHaveBeenCalledWith(site)
    })

    it('should call fallback when throw an exception cause redis return empty data', async () => {
      getMock.mockResolvedValue()
      const result = await fetchCommercialPlan(fallBackFnMock)({}, { site }, ctx)

      expect(result).toBeTruthy()
      expect(getMock).toHaveBeenCalledTimes(1)
      expect(fallBackFnMock).toHaveBeenCalledWith(site)
    })

    it('should return data from cache', async () => {
      getMock.mockResolvedValue(JSON.stringify(expectedResult))
      const result = await fetchCommercialPlan(fallBackFnMock)({}, { site }, ctx)

      expect(getMock).toHaveBeenCalledTimes(1)
      expect(fallBackFnMock).not.toHaveBeenCalled()
      expect(result).toEqual(expectedResult)
    })
  })
})
