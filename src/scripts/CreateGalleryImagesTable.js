import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";

const region = "us-east-1";
const dynamodb = new DynamoDBClient({ region });

const params = {
  TableName: "GalleryImages",
  KeySchema: [
    // Partition Key
    { AttributeName: "src", KeyType: "HASH" },
    // Sort Keys
    { AttributeName: "className", KeyType: "RANGE" }
  ],
  AttributeDefinitions: [
    { AttributeName: "alt", AttributeType: "S" },
    { AttributeName: "src", AttributeType: "S" },
    { AttributeName: "className", AttributeType: "S" }
  ],
  LocalSecondaryIndexes: [
    {
      IndexName: "AltIndex",
      KeySchema: [
        { AttributeName: "src", KeyType: "HASH" },
        { AttributeName: "alt", KeyType: "RANGE" }
      ],
      Projection: {
        ProjectionType: "KEYS_ONLY"
      }
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

const run = async () => {
  try {
    const data = await dynamodb.send(new CreateTableCommand(params));
    console.log("Table created with description: ", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error creating table: ", err);
  }
};

run();