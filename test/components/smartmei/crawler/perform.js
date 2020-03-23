import { performCrawler } from '../../../../src/components/smartmei/crawler/perform'
import axios from 'axios'
import faker from 'faker/locale/pt_BR'

jest.mock('axios')

describe('Crawler perform', () => {
  const handlerFnMock = jest.fn()
  const site = faker.internet.url()

  it(`should successfully get html from site`, async () => {
    const axiosMock = jest.fn().mockResolvedValue({
      data: true
    })
    axios.get = axiosMock
    handlerFnMock.mockResolvedValue(true)

    const result = await performCrawler(site, handlerFnMock)

    expect(result).toBeTruthy()
    expect(handlerFnMock).toHaveBeenCalledTimes(1)
    expect(axiosMock.mock.calls[0][0]).toEqual(site)
  })
})