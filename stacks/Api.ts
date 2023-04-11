import { type StackContext, Api, use } from 'sst/constructs'
import { Database } from '#/stacks/Database'
import { Parameters } from '#/stacks/Parameters'
import { Secrets } from '#/stacks/Secrets'

const functionRoute = (_function: string) => `packages/functions/src/${_function}.handler`

export function API(context: StackContext) {
  const api = new Api(context.stack, 'Api', {
    defaults: {
      function: {
        runtime: 'nodejs18.x',
        bind: [
          /**
           * Parameters
           */
          ...Parameters(context),
          /**
           * Secrets
           */
          ...Secrets(context),
          use(Database),
        ],
      },
    },
    routes: {
      /**
       * GET
       */
      'GET /': functionRoute('version'),
      'GET /v1': functionRoute('version'),
      'GET /version': functionRoute('version'),
      // airdrops
      'GET /v1/airdrops': functionRoute('airdrops'),
      'GET /v1/airdrops/{chain}': functionRoute('chain/index'),
      'GET /v1/airdrops/{chain}/{address}': functionRoute('chain/address'),
      /**
       * POST PUT DELETE
       */
      'POST /v1/airdrops': functionRoute('create'),
      'PUT /v1/airdrops': functionRoute('update'),
      'DELETE /v1/airdrops': functionRoute('delete'),
      /**
       * Default, catch-all
       */
      $default: functionRoute('not-found'),
    },
  })
  context.stack.addOutputs({
    ApiEndpoint: api.url,
  })
  return api
}
