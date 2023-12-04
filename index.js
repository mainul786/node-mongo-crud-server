const express = require('express');
const { MongoClient, ServerApiVersion,  ObjectId } = require('mongodb');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;


// Middleware

//database- userdb2
// password:-- IXcC7v6IsRUvcNvC

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://userdb2:IXcC7v6IsRUvcNvC@cluster0.0vnziom.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const userCollection = client.db('nodeMongoCrud').collection('users');

    app.get('/users', async(req, res)=>{
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);

    })

    app.post('/users', async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      console.log(result)
      res.send(result);
    });

    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };

      console.log('Trying to delete', id);

      const result = await userCollection.deleteOne(query);
      console.log(result);

      res.send(result);
    });

  } finally {

  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send(`simple node server running`)
})

app.listen(port, () => {
  console.log(`port is ${port} running now `)
})