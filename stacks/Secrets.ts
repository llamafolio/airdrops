import { Config, type StackContext } from 'sst/constructs'

export function Secrets(context: StackContext) {
  const LLAMANODES_API_KEY = new Config.Secret(context.stack, 'LLAMANODES_API_KEY')
  return [LLAMANODES_API_KEY]
}
