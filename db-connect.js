const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

(async function () {
  // Connection URL
  const url =
    "mongodb+srv://sumand:yOwqLiseHDbOmjHy@cluster0.wdba9.mongodb.net/arc?retryWrites=true&w=majorit";
  // Database Name
  const dbName = "myproject";
  const client = new MongoClient(url, { useNewUrlParser: true });

  try {
    // Use connect method to connect to the Server
    await client.connect();

    const db = client.db(dbName);
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
})();
