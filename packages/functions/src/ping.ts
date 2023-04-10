import { ApiHandler } from 'sst/node/api'
import { Config } from 'sst/node/config'

export const handler = ApiHandler(async (_event) => {
  console.log(Config.FOO)
  return {
    
    statusCode: 200,
    body: Config.FOO,
  }
})
