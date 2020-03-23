import faker from 'faker/locale/pt_BR'

import {
  formatPrice,
  convertPrice
} from '../../src/helpers/price'

describe('Price Helper', () => {

  describe('formatPrice', () => {
    it(`should throw an exception if the price is null`, function () {
      expect(formatPrice).toThrowError('Parameter cannot be null')
    })

    it(`should throw an exception if format price is invalid`, function () {
      expect(() => formatPrice(faker.random.word())).toThrowError('Invalid format price')
    })

    it('should successfully format price', function () {
      expect(formatPrice(`R$ 7,00`)).toEqual("7.00")
      expect(formatPrice(`R$ 7`)).toEqual("7")
    })
  })

  describe('convertPrice', () => {
    it ('should return an exception if parameters are null', function () {
      const expectedMsgException = 'Parameters cannot be null'
      expect(convertPrice).toThrowError(expectedMsgException)
      expect(() => convertPrice(faker.random.number(), null)).toThrowError(expectedMsgException)
      expect(() => convertPrice(null, faker.random.number())).toThrowError(expectedMsgException)
    })

    it ('should return an exception if parameters are invalid', function () {
      const expectedMsgException = 'Invalid parameters'
      expect(() => convertPrice(faker.random.word(), faker.random.number())).toThrowError(expectedMsgException)
      expect(() => convertPrice(faker.random.number(), faker.random.word())).toThrowError(expectedMsgException)
      expect(() => convertPrice(faker.random.word(), faker.random.word())).toThrowError(expectedMsgException)
    })

    it ('should successfully convert price', function () {
      const price = '7.00'
      const conversion = '0.198509372'
      const converterdPrice = convertPrice(price, conversion)
      expect(converterdPrice).toEqual('1.39')
    })
  })
})
