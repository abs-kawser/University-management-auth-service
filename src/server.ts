import mongoose from 'mongoose'
import config from './config/index'
import app from './app'
import { logger, errorlogger } from './shared/logger'

async function bootstrap() {
  //server
  //let server: Server

  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`Database connection established`)
    //server =
    app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    logger.info(err)

    errorlogger.error(`Database connection error: ${config.port}`)
  }

  // process.on(`unhandledRejection`, error => {
  //   console.log(`unhandledRejection detected: close server `)

  //   if (server) {
  //     server.close(() => {
  //       errorlogger.error(error)
  //     })
  //   } else {
  //     process.exit(1)
  //   }
  // })
}
bootstrap()

//testing server with server configuration settings and testing comment
