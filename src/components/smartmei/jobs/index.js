import cron from 'node-cron'

import { redisClient } from '../../../infrastructure'
import { exchange } from '../../../services'
import { performCrawler } from '../crawler/perform'
import { commercialPlanHandler, dataHandle } from '../crawler/handlers'
import logger from '../../../config/logger'

const SMARTMEI_FORMAT_CRON = process.env.SMARTMEI_FORMAT_CRON || "*/10 * * * * *"

const task = cron.schedule(SMARTMEI_FORMAT_CRON, async () => {
  try {
    logger.info('Job commercialPlan - starting')
    const values = await Promise.all([
      performCrawler(process.env.SMARTMEI_COMMERCIAL_PLAN_URL, commercialPlanHandler),
      exchange.fetchExchangeRate()
    ])

    logger.info('Job commercialPlan - fetch values')
  
    if(values) {
      const dataToCache =  JSON.stringify(dataHandle(values[0], values[1]))
      await redisClient.set(
        `fetchCommercialPlan:www.smartmei.com.br`,
        dataToCache
      )

      logger.info(`Job commercialPlan - cached values - ${dataToCache}`)
    }

    logger.info('Job commercialPlan - done')

  } catch (err) {
    logger.error('Error on job - do something (send an email,slack, etc.)')
  }
})

task.start();