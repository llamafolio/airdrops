import { Config, type StackContext } from 'sst/constructs'

export function Parameters(context: StackContext) {
  const API_VERSION = new Config.Parameter(context.stack, 'API_VERSION', {
    value: 'v1',
  })
  const FOO = new Config.Parameter(context.stack, 'FOO', {
    value: 'BAR',
  })
  return [API_VERSION, FOO]
}
