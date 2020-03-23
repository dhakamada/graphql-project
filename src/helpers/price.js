import BigNumber from 'bignumber.js'

const PRICE_FORMAT_REGEX = /(\d+(.\d{2})?)$/

export const formatPrice = (price) => {
  if (!price) throw new Error('Parameter cannot be null')
  const found = price.match(PRICE_FORMAT_REGEX)
  if (found && found.length > 0) {
    return found[0].replace(/,/g, '.')
  }

  throw new Error('Invalid format price')
}

export const convertPrice = (price, conversion) => {
  if (!price || !conversion) throw new Error('Parameters cannot be null')
  if (Number.isNaN(+new BigNumber(price))
    || Number.isNaN(+new BigNumber(conversion))) throw new Error('Invalid parameters')

  return new BigNumber(price)
    .multipliedBy(new BigNumber(conversion))
    .decimalPlaces(2, BigNumber.ROUND_HALF_EVEN)
    .toFixed(2)
}