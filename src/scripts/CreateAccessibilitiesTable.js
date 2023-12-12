import { DynamoDBClient, CreateTablesCommand } from "@aws-sdk/client-dynamodb";
const region = "us-east-1";
const client = new DynamoDBClient({ region });

const params = {
  TableName: "Accessibilities",
  KeySchema: [{ AttributeName: "name", KeyType: "HASH" }],
  AttributeDefinitions: [{ AttributeName: "name", AttributeType: "S" }],
  ProvisionedThroughput: { ReadCapacityUnits: 10, WriteCapacityUnits: 10 }
};

const run = async () => {
  try {
    const data = await client.send(new CreateTablesCommand(params));
    console.log("Created table with description: ", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Unable to create table: ", JSON.stringify(err, null, 2));
  }
};
run();