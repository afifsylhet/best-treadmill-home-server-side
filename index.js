const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')
const { MongoClient } = require('mongodb');
require('dotenv').config()


app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hi Node js active for this project")
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a3ykp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
async function run() {
    try {
        await client.connect();
        const database = client.db("bestTreadmillHome");
        const products = database.collection("products");
        const reviews = database.collection("reviews");
        // create a document to insert
        const doc = {
            title: "Afif Ahmed",
            content: "You are NIce",
        }
        // const result = await reviews.insertOne(doc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);




app.listen(port, () => {
    console.log("Node Listening From port:", port)
})