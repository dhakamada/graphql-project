import moment from 'moment-timezone'

const DATE_FORMAT_DEFAULT = 'YYYY-MM-DD HH:mm:ss'
const TIMEZONE_DEFAULT = 'America/Sao_Paulo'

export const dateToTimeZoneBR = (
  date,
  dateFormat = DATE_FORMAT_DEFAULT,
  timezone = TIMEZONE_DEFAULT
  ) => {

  return date ?
    moment.tz(date, timezone).format(dateFormat)
    : null
}

export const dateToTimestamp = (
    date,
    timezone = TIMEZONE_DEFAULT
  ) => {

  return date ?
    moment.tz(date, timezone).valueOf()
    : null
}
