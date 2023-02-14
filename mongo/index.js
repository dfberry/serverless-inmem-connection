const { MongoClient } = require("mongodb");

// Connection URL
const url = process.env.MONGODB_CONNECTION_STRING2;
const client = new MongoClient(url);

// Database Name
const dbName = "serverless-connection-test";

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  const name = req.query.name || (req.body && req.body.name);

  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const collection = db.collection("documents");

  const insertResult = await collection.insertMany([{ name }]);
  const findResult = await collection.find({}).toArray();
  const statsResult = await db.stats()

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: {
      insertResult,
      findResult,
      statsResult
    },
  };
};
