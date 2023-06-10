import mongoose from 'mongoose'
import config from './config/index'
import app from './app'
import { logger, errorlogger } from './shared/logger'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`Database connection established`)

    app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    logger.info(err)

    errorlogger.error(`Database connection error: ${config.port}`)
  }
}
bootstrap()

//testing server with server configuration settings and testing comment
