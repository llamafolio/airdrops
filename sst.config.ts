import { SSTConfig } from 'sst'
import { API } from '#/stacks/Api'
import { Web } from '#/stacks/Web'
import { Database } from '#/stacks/Database'
// import { Parameters } from '#/stacks/Parameters'

export default {
  config: (_input) => ({
    name: 'airdrops',
    region: 'us-east-1',
  }),
  stacks: (app) => {
    app
      // .stack(Parameters)
      //
      .stack(Database)
      .stack(API)
      .stack(Web)
  },
} satisfies SSTConfig
