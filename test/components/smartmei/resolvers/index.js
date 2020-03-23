import { fetchCommercialPlan } from '../../../../src/components/smartmei/resolvers'
import Query from '../../../../src/components/smartmei/resolvers/query'

describe('Smartmei resolvers index', () => {
  it('should only return the query functions', () => {
    expect(Query).toEqual(fetchCommercialPlan)
  })
})
