import { CronJob } from 'cron'
import { config } from './config'

const cron = new CronJob(config.cronJobExpression, () => {
  console.log('executing cron job once every hour')
})

export { cron }
