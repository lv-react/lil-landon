import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import * as fs from 'fs/promises';

const REGION = "us-east-1";
const Table = "GalleryImages";
const dynamodbDocClient = DynamoDBDocument.from(
  new DynamoDBClient({ region: REGION, requestHandler: new NodeHttpHandler() })
);

console.log("Writing entries to GalleryImages table.");

(async () => {
  const galleryImagesData = JSON.parse(await fs.readFile('../components/data/gallery_images.json', 'utf8'));
  for(const galleryImage of galleryImagesData) {
    let className = galleryImage.className;
    if (className.trim() === "")
      className = "no_class";

    const params = {
      TableName: Table,
      Item: {
        "src": galleryImage.src,
        "alt": galleryImage.alt,
        "className": className
      }
    };

    try {
      await dynamodbDocClient.put(params);
      console.log("Added", galleryImage.src, "to table.");
    } catch (err) {
      console.error("Unable to load data into table for gallery images",
        galleryImage.src, ". Error: ", JSON.stringify(err, null, 2))
    }
  }
})()