import AWS from 'aws-sdk'
import { Table } from 'sst/node/table'
import { ApiHandler } from 'sst/node/api'
import { stringify, jsonHeaders } from '#/core/json'
import { type Airdrop } from '#/core/types'
import { isParse } from 'typia'

const dynamoDb = new AWS.DynamoDB.DocumentClient()

export const handler = ApiHandler(async (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      headers: jsonHeaders,
      body: stringify({ error: 'Missing body' }),
    }
  }

  const data = isParse<Pick<Airdrop, 'chain' | 'protocol'>>(event.body)
  if (!data) {
    return {
      statusCode: 400,
      headers: jsonHeaders,
      body: stringify({ error: 'Invalid body' }),
    }
  }
  try {
    const parameters: AWS.DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: Table.Airdrops.tableName,
      Key: {
        chain: data.chain,
        protocol: data.protocol,
      },
    }
    await dynamoDb.delete(parameters).promise()
    return {
      statusCode: 200,
      headers: jsonHeaders,
      body: stringify({ message: 'Airdrop deleted' }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: jsonHeaders,
      body: stringify({ error: error instanceof Error ? error.message : error }),
    }
  }
})
