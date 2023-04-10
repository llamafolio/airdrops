import AWS from 'aws-sdk'
import { Table } from 'sst/node/table'
import { ApiHandler } from 'sst/node/api'
import { stringify, jsonHeaders } from '#/core/json'

const dynamoDb = new AWS.DynamoDB.DocumentClient()

export const handler = ApiHandler(async (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      headers: jsonHeaders,
      body: stringify({ error: 'Missing body' }),
    }
  }

  const data = JSON.parse(event.body)
  try {
    const parameters: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: Table.Airdrops.tableName,
      Item: {
        chain: data.chain,
        protocol: data.protocol,
        announcement: data.announcement,
        token: data.token,
        contract: data.contract,
        eligibility: data.eligibility,
        start: data.start,
        end: data.end,
      },
    }
    await dynamoDb.put(parameters).promise()
    return {
      statusCode: 200,
      headers: jsonHeaders,
      body: stringify({ message: 'Airdrop created' }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: jsonHeaders,
      body: stringify({ error: error instanceof Error ? error.message : error }),
    }
  }
})
