import { StaticSite, type StackContext, use } from 'sst/constructs'
import { API } from '#/stacks/Api'

export function Web({ stack }: StackContext) {
  const api = use(API)
  const web = new StaticSite(stack, 'Web', {
    path: 'packages/web',
    buildOutput: 'dist',
    buildCommand: 'pnpm build',
    dev: {
      deploy: false,
    },
    environment: {
      VITE_APP_API_URL: api.url,
    },
  })
  stack.addOutputs({
    WebEndpoint: web.url,
  })
}
