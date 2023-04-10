import { type StackContext, Api } from 'sst/constructs'

const functionRoute = (_function: string) => `packages/functions/src/${_function}.handler`

export function API(context: StackContext) {
  const api = new Api(context.stack, 'Api', {
    defaults: {},
    routes: {
      'GET /': functionRoute('version'),
      'GET /health': functionRoute('ping'),
      'GET /version': functionRoute('version'),
      /* airdrops */
      'GET /v1/airdrops': functionRoute('airdrops'),
      'GET /v1/airdrops/{chain}': functionRoute('chain/index'),
      'GET /v1/airdrops/{chain}/{address}': functionRoute('chain/address'),
      $default: functionRoute('not-found'),
    },
  })
  context.stack.addOutputs({
    ApiEndpoint: api.url,
  })

  return api
}
