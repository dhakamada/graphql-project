import { dataHandle } from '../../../../src/components/smartmei/crawler/handlers'

describe('Crawler Handlers', () => {
  describe('Data Handler', () => {
    const rates = {
      'EUR': 0.1854014869,
      'USD': 0.198509372
    }

    it(`should format de data`, () => {
      const result = dataHandle(
        { description: 'description', price: 'R$ 7,01', queryDate: '2020-03-22 21:30:40'},
        { rates })

      expect(result).toEqual(
        {
          queryDate: '2020-03-22 21:30:40',
          description: 'description',
          realPrice: 'R$ 7,01',
          usdPrice: '$ 1.39',
          eurPrice: '€ 1.30'
        }
      )
    })

    it(`should throw an exception if price is invalid`, () => {
      expect(() => dataHandle(
        { description: 'description', price: 'INVALID PRICE', queryDate: '2020-03-22 21:30:40'},
        { rates })
      ).toThrowError('Invalid format price')        
    })
  })
})


