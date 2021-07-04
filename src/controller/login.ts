import { Context } from 'koa'
import { description, request, summary, tagsAll } from 'koa-swagger-decorator'
import * as jwt from 'jsonwebtoken'
import * as crypto from 'crypto'

@tagsAll(['Login'])
export default class LoginController {
  @request('post', '/login')
  @summary('Login page')
  @description(
    'A simple welcome message to verify the service is up and running.'
  )
  public static async loginUser(ctx: Context): Promise<void> {
    const data = ctx.request.body
    const token = jwt.sign(data, 'SJKH', {expiresIn: '1h'})
    console.log(token)
    ctx.body = 'Hello world!'
  }
}
