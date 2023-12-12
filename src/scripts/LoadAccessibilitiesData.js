import { DynamoDBClient, PutCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import fs from 'fs';

const region = "us-east-1";
const client = new DynamoDBClient({ region });

console.log("Writing entries to Accessibilities table.");

const accessibilitiesData =
  JSON.parse(fs.readFileSync('../components/data/accessibilities.json', { encoding:'utf8', flag:'r' }));

for (const accessibility of accessibilitiesData) {
  const params = {
    TableName: "Accessibilities",
    Item: marshall({
      "name": accessibility.name
    })
  };
  try {
    const data = await client.send(new PutCommand(params));
    console.log("Added", accessibility.name, "to table.");
  }
  catch(err) {
    console.error("Unable to load data into table for accessibility",
      accessibility.name, ". Error: ", JSON.stringify(err, null, 2))
  }
}