import { ApiHandler } from 'sst/node/api'
import { Config } from 'sst/node/config'

export const handler = ApiHandler(async (_event) => {
  return {
    statusCode: 200,
    body: Config.API_VERSION,
  }
})
