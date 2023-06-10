//import winston from 'winston'
import path from 'path'

import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, printf, prettyPrint } = format
import DailyRotateFile from 'winston-daily-rotate-file'

//customLog
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minuts = date.getMinutes()
  const seconds = date.getSeconds()

  return `${date.toDateString()} ${hour}:${minuts}:${seconds} ${minuts}  [${label}] ${level}: ${message}`
  //return `${timestamp} [${label}] ${level}: ${message}`
})

const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'PH' }), timestamp(), prettyPrint()),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'phu-%DATE%-success.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

const errorlogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'PH' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'phu-%DATE%-error.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})
export { logger, errorlogger }
