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
        const orders = database.collection("orders");


        app.get('/products', async (req, res) => {
            const query = products.find({});
            const cursor = await query.toArray();
            res.send(cursor);
            console.log("product get successfully");
        })

        app.get('/reviews', async (req, res) => {
            const query = reviews.find({});
            const cursor = await query.toArray();
            res.send(cursor);
            console.log("review get successfully");
        })


        app.post('/orders', async (req, res) => {
            const newOrder = req.body;
            const result = await orders.insertOne(newOrder);
            console.log("got new order", req.body);
            console.log("added order", result);
            res.json(result);
            console.log('orders received')
        });


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);




app.listen(port, () => {
    console.log("Node Listening From port:", port)
})