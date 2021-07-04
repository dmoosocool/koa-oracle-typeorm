import Router from '@koa/router'
import { general, login } from '../controller'

const unprotectedRouter = new Router()
unprotectedRouter.get('/', general.helloWorld)

unprotectedRouter.post('/login', login.loginUser)
export { unprotectedRouter }
