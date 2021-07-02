import { Context } from 'koa'
import { config } from './config'
import { transports, format } from 'winston'
import * as path from 'path'

const logger = (winstonInstance: any): any => {
  winstonInstance.configure({
    level: config.debugLogging ? 'debug' : 'info',
    transports: [
      //
      // - Write all logs error (and below) to `error.log`.
      new transports.File({
        filename: path.resolve(__dirname, '../logs/error.log'),
        level: 'error',
      }),
      //
      // - Write to all logs with specified level to console.
      new transports.Console({
        format: format.combine(format.colorize(), format.simple()),
      }),
    ],
  })

  return async (ctx: Context, next: () => Promise<any>): Promise<void> => {
    const start = +new Date()

    try {
      await next()
    } catch (err) {
      ctx.status = (err as any).status || 500
      ctx.body = (err as any).message
    }

    const ms = new Date().getTime() - start

    let logLevel: string
    if (ctx.status >= 500) {
      logLevel = 'error'
    } else if (ctx.status >= 400) {
      logLevel = 'warn'
    } else {
      logLevel = 'info'
    }

    const msg = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`

    winstonInstance.log(logLevel, msg)
  }
}

export { logger }
