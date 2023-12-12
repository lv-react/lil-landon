import { DynamoDBClient, PutCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import fs from 'fs';

(async function() {
  const region = "us-east-1";
  const client = new DynamoDBClient({ region });
  const ddbDocClient = DynamoDBDocument.from(client);

  console.log("Writing entries to Services table.");

  const servicesData = JSON.parse(fs.readFileSync('../components/data/services.json', 'utf8'));

  for (let service of servicesData) {
    const params = {
      TableName: "Services",
      Item: {
        "name": service.name
      }
    };

    try {
      await ddbDocClient.put(params);
      console.log("Added", service.name, "to table.");
    } catch (err) {
      console.error(
        "Unable to load data into table for accessibility",
        service.name, ". Error: ", JSON.stringify(err, null, 2)
      );
    }
  }
})();