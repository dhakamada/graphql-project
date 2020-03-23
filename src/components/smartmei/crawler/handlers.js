import { convertPrice, formatPrice } from '../../../helpers/price'
import { dateToTimeZoneBR } from '../../../helpers/date'
import cheerio from 'cheerio'

export const commercialPlanHandler = (content) => {
  const queryDate = dateToTimeZoneBR(new Date())
  let description, price
  const $ = cheerio.load(content)

  if ($('.tarifas-2-0-2 h4').text().trim() !== 'PLANOProfissional') return null

  $('#tarifas-2').find('.row-eq-height').each(function (i) {
    if(i === 2) {
      description = $(this).find('.cell-small-title').text().trim()
      price = $(this).find('.tarifas-2-2-2').text().trim()
      return false //break
    }
  })

  if (description && price) return  { description, price, queryDate }
  return null
}

export const dataHandle = ({ description, price, queryDate }, { rates }) => {
  const formattedPrice = formatPrice(price)
  return {
    queryDate,
    description,
    realPrice: price,
    usdPrice: `$ ${convertPrice(formattedPrice, rates.USD)}`,
    eurPrice: `€ ${convertPrice(formattedPrice, rates.EUR)}`,
  }
}
