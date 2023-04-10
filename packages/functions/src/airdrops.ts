import { ApiHandler } from 'sst/node/api'
import { stringify, jsonHeaders } from '#/core/json'
import airdrops from '#/core/airdrops.json'

/**
 * GET /v1/airdrops
 */

export const handler = ApiHandler(async (_event) => ({
  statusCode: 200,
  headers: jsonHeaders,
  body: stringify(airdrops),
}))
