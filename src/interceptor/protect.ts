import { SwaggerRouter } from 'koa-swagger-decorator'
import { user } from '../controller'

const protectedRouter = new SwaggerRouter()

protectedRouter.get('/users', user.getUsers)
protectedRouter.get('/user', user.getUser)
protectedRouter.post('/users', user.createUser)
protectedRouter.put('/users/:id', user.updateUser)
protectedRouter.delete('/users/:id', user.deleteUser)

protectedRouter.swagger({
  title: 'AXKH Koa',
  description:
    'API REST using NodeJS and Koa framework, typescript. TypeORM for SQL with class-validators. Middlerwares JWT, CORS, Winston Logger.',
  version: '0.0.1',
})

protectedRouter.mapDir(__dirname)

export { protectedRouter }
