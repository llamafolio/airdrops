import { ApiHandler } from 'sst/node/api'

export const handler = ApiHandler(async (_event) => {
  return {
    statusCode: 200,
    body: 'v1',
  }
})
