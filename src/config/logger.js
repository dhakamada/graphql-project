import { createLogger, format, transports } from 'winston'

const { combine, timestamp, json, splat, printf } = format;
 
const logger = createLogger({
  defaultMeta: { component: 'graphql' },
  transports: [
    new transports.Console({
      level: process.env.NODE_ENV === 'test' ? [] : process.env.LOGGER_LEVEL
    })
  ],
  format: combine(
    splat(),
    timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    json(),
    printf(info => {
      return `${info.timestamp} ${info.level}: ${info.message}`
    })
  )
})

export default logger

