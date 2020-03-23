import url from 'url'
import logger from '../../../config/logger'

import { commercialPlanHandler, dataHandle } from '../crawler/handlers'
  
export const fetchCommercialPlanFallBack = (performCrawler, exchangeService) => async (site) => {
  try {
    logger.info('Query - fetchCommercialPlanFallBack - start')
    const values = await Promise.all(
      [
        performCrawler(site, commercialPlanHandler),
        exchangeService.fetchExchangeRate()
      ]
    )
    
    const result = dataHandle(values[0], values[1])
    logger.info('Query - fetchCommercialPlanFallBack - done - %o', result )
    return result

  } catch (err) {
    logger.error('Error fetchCommercialPlanFallBack')
    return null
  }
}

export const fetchCommercialPlan = fallBackFn => async (_, { site }, ctx) => {
  try {
    logger.info('Query - fetchCommercialPlan - start')
    const siteURL = new url.parse(site)
    const cacheDataFromCache = await ctx.redisClient.get(`fetchCommercialPlan:${siteURL.host}`)
    if (!cacheDataFromCache) throw new Error('Empty data in cache')
  
    logger.info(`Query - fetchCommercialPlan - get data from cache - ${cacheDataFromCache}`)
    const parsedData = JSON.parse(cacheDataFromCache)
    logger.info(`Query - fetchCommercialPlan - done`)
    return parsedData

  } catch (err) {
    logger.warn('Query - fetchCommercialPlan - fallback - %o', err && err.message ? err.message : null)
    return await fallBackFn(site)
  }
}