import { exchange } from '../../src/services'
import Exchange from '../../src/services/exchange'

describe('Services index', () => {
  it ('should return an instance of Exchange', () => {
    expect(exchange).toBeInstanceOf(Exchange)
    expect(exchange instanceof Object).toBeTruthy()
  })
})
