import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";

const dynamoDb = new DynamoDBClient({
  region: "us-east-1",
});

const params = {
  TableName: "MenuLinks",
  KeySchema: [
    { AttributeName: "href", KeyType: "HASH" },
    { AttributeName: "text", KeyType: "RANGE" },
  ],
  AttributeDefinitions: [
    { AttributeName: "class", AttributeType: "S" },
    { AttributeName: "href", AttributeType: "S" },
    { AttributeName: "text", AttributeType: "S" },
  ],
  LocalSecondaryIndexes: [
    {
      IndexName: "ClassIndex",
      KeySchema: [
        { AttributeName: "href", KeyType: "HASH" },
        { AttributeName: "class", KeyType: "RANGE" },
      ],
      Projection: {
        ProjectionType: "KEYS_ONLY",
      },
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

const createTable = new CreateTableCommand(params);

dynamoDb.send(createTable)
  .then((data) => {
    console.log("Created table with description: ", JSON.stringify(data, null, 2));
  })
  .catch((err) => {
    console.error("Unable to create table: ", JSON.stringify(err, null, 2));
  });