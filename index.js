const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
      //get fruit details
    app.get('/fruit/:id' , async (req, res) => {
      const id = req.params.id;
      const query = {_id: ObjectId(id)}
      const fruit= await fruitsCollection.findOne(query);
      res.send(fruit);

    })   

    // update fruit quantity
    app.put('/fruit/:id' , async (req, res) => {
      const id = req.params.id;
      const newQuantity = req.body;
      const filter = {_id: ObjectId(id)}
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          quantity : newQuantity.newQuantity
        },
      };
      const result = await fruitsCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    })

      //delete fruit item
      app.delete('/fruit/:id', async (req, res) =>{
        const id = req.params.id;
        const query = {_id : ObjectId(id)}
        const result = await fruitsCollection.deleteOne(query);
        res.send(result);
    })
     // post fruit
     app.post('/fruit', async (req, res) => {
      const newInventory = req.body;
      const result = await fruitsCollection.insertOne(newInventory);
      res.send(result);

    });
    // add item 
    app.get('/item', async (req, res) => {
      const email = req.query.email;
      const query = {email: email};
       const cursor = fruitsCollection.find(query);
       const fruits = await cursor.toArray();
       res.send(fruits);

    })
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