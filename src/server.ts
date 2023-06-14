import mongoose from 'mongoose'
import config from './config/index'
import app from './app'
import { logger, errorlogger } from './shared/logger'
import { Server } from 'http'

//uncought

process.on('uncaughtException', error => {
  errorlogger.error(error)
  //console.log(`uncaughtException detected: `)

  process.exit(1)
})

let server: Server

async function bootstrap() {
  //server

  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`Database connection established`)

    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    logger.info(err)

    errorlogger.error(`Database connection error: ${config.port}`)
  }

  process.on(`unhandledRejection`, error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error)
      })
    } else {
      process.exit(1)
    }
  })
}
bootstrap()

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received')

  if (server) {
    server.close()
  }
})

//testing server with server configuration settings and testing comment
