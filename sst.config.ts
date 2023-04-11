import { SSTConfig } from 'sst'
import { API } from '#/stacks/Api'
import { Web } from '#/stacks/Web'
import { Database } from '#/stacks/Database'

export default {
  config: (_input) => ({
    name: 'airdrops',
    region: 'us-east-1',
  }),
  stacks: (app) => {
    app //
      .stack(Database)
      .stack(API)
      .stack(Web)
  },
} satisfies SSTConfig
