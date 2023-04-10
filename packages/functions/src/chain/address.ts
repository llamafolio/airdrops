import { ApiHandler } from 'sst/node/api'
import { isAddress } from 'viem'
import { chains } from '#/core/constants'
import { stringify, jsonHeaders } from '#/core/json'

/**
 * GET /v1/airdrops/{chain}/{address}
 */

export const handler = ApiHandler(async (event) => {
  const { chain, address } = event.pathParameters ?? {}

  switch (true) {
    case !chain && !address:
      return {
        statusCode: 400,
        headers: jsonHeaders,
        body: stringify({ error: 'Missing path parameters' }),
      }
    case !chain:
      return {
        statusCode: 400,
        headers: jsonHeaders,
        body: stringify({ error: 'Missing chain path parameter' }),
      }
    case !chains.includes(`${chain}`):
      return {
        statusCode: 400,
        headers: jsonHeaders,
        body: stringify({
          error: `Invalid chain path parameter: ${chain}. Valid values are: ${chains.join(', ')}.`,
        }),
      }
    case !isAddress(`${address}`):
      return {
        statusCode: 400,
        headers: jsonHeaders,
        body: stringify({ error: 'Not a valid EVM address' }),
      }
    default:
      // TODO: implement adderess airdrops
      return {
        statusCode: 501,
        headers: jsonHeaders,
        body: stringify({
          error: 'Not implemented',
        }),
      }
  }
})
