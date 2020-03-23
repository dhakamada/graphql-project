import axios from 'axios'
import cheerio from 'cheerio'

export const performCrawler = async (site, handlerFn) => {
    const result = await axios.get(`${site}`,
    {
      timeout: 5000
    })

    return Promise.resolve(handlerFn(result.data))
}

