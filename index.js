const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
require('dotenv').config()

//middleWare
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.stcra.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
      await client.connect();
    const fruitsCollection = client.db("freshFruits").collection("fruits")
    
    // get fruits 

    app.get('/fruit', async (req, res) =>{
      const query ={}
      const cursor = fruitsCollection.find(query);
      const fruits = await cursor.toArray();
      res.send(fruits);
      })
      //get 
   
     
     
  
    } finally {
      
    }
  }
  run().catch(console.dir);



app.get('/', (req, res) =>{
    res.send('Running my node server')
})

app.listen(port, () => {
    console.log('fresh fruits and vegetables server is running ');
})