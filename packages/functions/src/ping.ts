import { ApiHandler } from 'sst/node/api'

export const handler = ApiHandler(async (_event) => ({
  statusCode: 200,
  body: 'ping',
}))
