import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

interface IDatabase {
  port: number
  username: string
  password: string
  sid: string
}

export interface Config {
  port: number
  debugLogging: boolean
  jwtSecret: string
  dbEntitiesPath: string[]
  cronJobExpression: string
  database: IDatabase
}
const isDevMode = process.env.NODE_ENV === 'development'

const config: Config = {
  port: +(process.env.PORT || 3000),
  debugLogging: isDevMode,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-whatever',
  dbEntitiesPath: [
    ...(isDevMode ? ['src/entity/**/*.ts'] : ['dist/entity/**/*.js']),
  ],
  cronJobExpression: '0 * * * *',
  database: {
    port: +(process.env.DB_PORT || 1521),
    username: process.env.DB_USERNAME || 'system',
    password: process.env.DB_PASSWORD || 'oracle',
    sid: process.env.DB_SID || 'xe',
  },
}

export { config }
