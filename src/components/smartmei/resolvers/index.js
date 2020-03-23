import { fetchCommercialPlan, fetchCommercialPlanFallBack } from './query'
import { performCrawler } from '../crawler/perform'
import { exchange } from '../../../services'

const fallBackFn = fetchCommercialPlanFallBack(performCrawler, exchange)
const fetchComPlan = fetchCommercialPlan(fallBackFn)

const Query = {
  fetchCommercialPlan: fetchComPlan
}

export default {
  Query
}