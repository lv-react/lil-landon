import * as awsSdk from "@aws-sdk/client-dynamodb";
import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";

// Set the AWS Region
const region = "us-east-1";
awsSdk.config.update({ region });

// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient(REGION);

const params = {
  TableName: "Services",
  AttributeDefinitions: [
    {
      AttributeName: "name",
      AttributeType: "S",
    },
  ],
  KeySchema: [
    {
      AttributeName: "name",
      KeyType: "HASH",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

const run = async () => {
  try {
    const data = await ddbClient.send(new CreateTableCommand(params));
    console.log("Table created:", data);
  } catch (err) {
    console.error("Error", err);
  }
};

run();