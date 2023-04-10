import { ApiHandler } from 'sst/node/api'
import { stringify, jsonHeaders } from '#/core/json'
import airdrops from '#/core/airdrops.json'
import { chains } from '#/core/constants'

/**
 * GET /v1/airdrops/{chain}
 */

export const handler = ApiHandler(async (event) => {
  const pathParameters = event.pathParameters
  if (!pathParameters) {
    return {
      statusCode: 400,
      body: stringify({ error: 'Missing path parameters' }),
    }
  }
  const chain = pathParameters.chain
  if (!chain) {
    return {
      statusCode: 400,
      body: stringify({ error: 'Missing chain path parameter' }),
    }
  }
  if (!chains.includes(chain)) {
    return {
      statusCode: 400,
      body: stringify({ error: `Invalid chain path parameter: ${chain}. Valid values are: ${chains.join(', ')}.` }),
    }
  }
  // TODO: implement filter
  const filter = event.queryStringParameters
  if (filter) {
    return {
      statusCode: 501,
      body: stringify({ error: 'Not implemented' }),
    }
  }
  return {
    statusCode: 200,
    headers: jsonHeaders,
    body: stringify({
      data: airdrops[chain as keyof typeof airdrops],
    }),
  }
})
