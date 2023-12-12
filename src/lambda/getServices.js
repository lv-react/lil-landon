import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

const dynamodb = new DynamoDBClient({region: "us-east-1"});
const ddbDoc = new DynamoDBDocument(dynamodb);

export const handler = async (event, context, callback) => {
  const params = {
    TableName: "Services"
  };

  const data = await ddbDoc.scan(params);
  return data.Items;
};