import axios from 'axios'

export default class Exchange {
  constructor(
    { host = process.env.EXCHANGE_API_HOST,
      timeout = process.env.EXCHANGE_API_TIMEOUT,
      base = process.env.EXCHANGE_API_BASE_DEFAULT
    }) {
      const timeoutInt = parseInt(timeout)
      this.host = host
      this.timeout = Number.isNaN(timeoutInt) ? 5000 : timeoutInt
      this.base = base || 'BRL'
  }

  async fetchExchangeRate () {
    const result = await axios.get(`${this.host}`, 
    {
      params: { base: this.base },
      timeout: this.timeout
    })

    return result.data
  }
}
