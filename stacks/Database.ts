import { type StackContext, Table } from 'sst/constructs'

export function Database(context: StackContext) {
  const table = new Table(context.stack, 'Airdrops', {
    fields: {
      chain: 'string',
      protocol: 'string',
      announcement: 'string',
      token: 'string',
      contract: 'string',
      eligibility: 'string',
      start: 'string',
      end: 'string',
    },
    primaryIndex: {
      partitionKey: 'chain',
      sortKey: 'protocol',
    },
    globalIndexes: {
      byToken: {
        partitionKey: 'token',
        sortKey: 'chain',
      },
      byContract: {
        partitionKey: 'contract',
        sortKey: 'chain',
      },
      byEligibility: {
        partitionKey: 'eligibility',
        sortKey: 'chain',
      },
      byStart: {
        partitionKey: 'start',
        sortKey: 'chain',
      },
      byEnd: {
        partitionKey: 'end',
        sortKey: 'chain',
      },
    },
  })
  return table
}
