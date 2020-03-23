import {
  dateToTimeZoneBR,
  dateToTimestamp
} from '../../src/helpers/date'

import moment from 'moment-timezone'

describe('Date Helper', () => {
  describe('dateToTimeZoneBR', () => {
    it('should parse any date to timezone America/Sao_Paulo', () => {
      const now = new Date()

      const dateInSaoPaulo = dateToTimeZoneBR(now)
      const dateInJapan = moment.tz(now, 'Asia/Tokyo')
      const dateInEUA = moment.tz(now, 'America/New_York')
      const dateInAfrica = moment.tz(now, 'Africa/Johannesburg')
  
      expect(dateToTimeZoneBR(dateInJapan)).toEqual(dateInSaoPaulo)
      expect(dateToTimeZoneBR(dateInEUA)).toEqual(dateInSaoPaulo)
      expect(dateToTimeZoneBR(dateInAfrica)).toEqual(dateInSaoPaulo)
    })

    it('should return null if date is null', () => {
      expect(dateToTimeZoneBR(null)).toBeNull()
    })
  })

  describe('dateToTimestamp', () => {
    it('should return a timestamp from any date', () => {
      const now = new Date()
      const result = dateToTimestamp(now)
  
      const timeStampExpected = moment.tz(now, 'America/Sao_Paulo').valueOf()
  
      expect(Number.isInteger(result)).toBe(true)
      expect(timeStampExpected).toEqual(result)
    })

    it('should return null if date is null', () => {
      expect(dateToTimestamp(null)).toBeNull()
    })
  })
})
