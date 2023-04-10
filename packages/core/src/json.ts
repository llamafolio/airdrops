import type { APIGatewayProxyStructuredResultV2 } from 'aws-lambda'

/** JSON stringify with optional indentation. Default 2 */
export function stringify(value: unknown, indent: number = 2): string {
  return JSON.stringify(value, undefined, indent)
}

/** JSON headers content type */
export const jsonHeaders: APIGatewayProxyStructuredResultV2['headers'] = {
  'Content-Type': 'application/json',
}
