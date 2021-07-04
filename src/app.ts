import 'reflect-metadata'
import { createConnection, ConnectionOptions } from 'typeorm'
import Koa from 'koa'
import cors from '@koa/cors'
// import convert from 'koa-convert'
import winston from 'winston'

import jwt from 'koa-jwt'
import bodyParser from 'koa-bodyparser'
import { protectedRouter, unprotectedRouter } from './interceptor'
import { config } from './config'
import { cron } from './cron'
import { logger } from './logger'

const connectionOptions: ConnectionOptions = {
  type: 'oracle',
  host: '0.0.0.0',
  port: config.database.port,
  synchronize: true,
  username: config.database.username,
  password: config.database.password,
  database: config.database.sid,
  logging: false,
  entities: config.dbEntitiesPath,
  extra: {
    connectString: `0.0.0.0:${config.database.port}/${config.database.sid}`
  }
}

createConnection(connectionOptions)
  .then(async () => {
    const app = new Koa()

    console.log(config.jwtSecret)
    // Enable cors with default options
    app.use(cors())
    // Logger middleware -> use winston as logger (logging.ts with config)
    app.use(logger(winston))
    // Enable bodyParser with default options
    app.use(bodyParser())

    // these routes are NOT protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
    app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods())
    
    // JWT middleware -> below this line routes are only reached if JWT token is valid, secret as env variable
    // do not protect swagger-json and swagger-html endpoints
    app.use(jwt({ secret: config.jwtSecret }).unless({ path: [/^\/swagger-/] }))

    // These routes are protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
    app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods())

    // Register cron job to do any action needed
    cron.start()

    app.listen(config.port, () => {
      console.log('Koa application is up and runing on http://0.0.0.0:3000')
    })
  })
  .catch((error) => console.log('TypeORM connection error:', error))
