import { ApiHandler } from 'sst/node/api'
import { stringify } from '#/core/json'

export const handler = ApiHandler(async (_event) => ({
  statusCode: 404,
  headers: {
    'Content-Type': 'application/json',
  },
  body: stringify({
    error: [
      "This resource doesn't exist.",
      'When calling an API endpoint, make sure to include the version number in the path.',
      'For example, to call the /airdrops endpoint, use /v1/airdrops.',
    ].join(' '),
  }),
}))
