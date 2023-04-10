import { SSTConfig } from 'sst'
import { API } from './stacks/Api'
import { Web } from './stacks/Web'

export default {
  config: (_input) => ({
    name: 'airdrops',
    region: 'us-east-1',
  }),
  stacks: (app) => {
    app.stack(API).stack(Web)
  },
} satisfies SSTConfig
