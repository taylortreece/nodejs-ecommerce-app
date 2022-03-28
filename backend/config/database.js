const { MONGO_URI } = process.env;
const { MongoClient, ServerApiVersion } = require('mongodb');

console.log("connecting to db...")
try {
    const client = new MongoClient(MONGO_URI, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1
    });

    client.connect();
    console.log("client has connected to MongoDB.");

  } catch(err) {
    console.log("error connecting to MongoDB: ", err);
}