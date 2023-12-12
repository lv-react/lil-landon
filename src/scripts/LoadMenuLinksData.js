import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import * as fs from 'fs/promises';

const REGION = "us-east-1";
const client = new DynamoDBClient({ region: REGION });
const ddbDocClient = DynamoDBDocument.from(client);

console.log("Writing entries to MenuLinks table.");

let putOp = async function(menuLink) {
  const params = {
    TableName: "MenuLinks",
    Item: {
      "class": menuLink.class,
      "href": menuLink.href,
      "text": menuLink.text
    }
  };

  try {
    await ddbDocClient.put(params);
    console.log("Added", menuLink.text, "to table.");
  } catch (err) {
    console.error("Unable to load data into table for menu links", menuLink.text, ". Error: ", JSON.stringify(err, null, 2));
  }
};

fs.readFile('../components/data/menu_links.json', 'utf8')
  .then(data => {
    const menuLinksData = JSON.parse(data);
    if (menuLinksData instanceof Array)
      menuLinksData.forEach(putOp)
  })
  .catch(console.error)