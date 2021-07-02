import Router from '@koa/router'
import { general } from '../controller'

const unprotectedRouter = new Router()

unprotectedRouter.get('/', general.helloWorld)

export { unprotectedRouter }
