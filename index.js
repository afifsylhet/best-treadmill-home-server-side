const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')
const { MongoClient } = require('mongodb');
require('dotenv').config()
const ObjectID = require('mongodb').ObjectID



app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hi Node js active for this project")
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster01.joqm4ye.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
async function run() {
    try {
        await client.connect();
        const database = client.db("bestTreadmillHome");
        const products = database.collection("products");
        const reviews = database.collection("reviews");
        const orders = database.collection("orders");
        const users = database.collection("users");


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

        app.get('/orders', async (req, res) => {
            const query = orders.find({});
            const cursor = await query.toArray();
            res.send(cursor);
            console.log("orders get successfully");
        })

        app.get('/users', async (req, res) => {
            const query = users.find({});
            const cursor = await query.toArray();
            res.send(cursor);
            console.log("orders get successfully");
        })


        app.post('/orders', async (req, res) => {
            const newOrder = req.body;
            const result = await orders.insertOne(newOrder);
            console.log("got new order", req.body);
            console.log("added order", result);
            res.json(result);
            console.log('orders received')
        });


        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await users.insertOne(newUser);
            console.log("got new user", req.body);
            console.log("added user", result);
            res.json(result);
            console.log('user received')
        });

        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = await reviews.insertOne(review);
            console.log(result);
            res.json(result);
        });

        app.post('/products', async (req, res) => {
            const newProduct = req.body;
            const result = await products.insertOne(newProduct);
            console.log(result);
            res.json(result);
        });

        app.delete('/orders', async (req, res) => {
            const id = req.body._id;
            console.log(id);
            const query = { _id: ObjectID(id) };
            const result = await orders.deleteOne(query);
            res.json(result)
            console.log('Your Order Deleted Successfully', result)
        })
        app.delete('/products', async (req, res) => {
            const id = req.body._id;
            console.log(id);
            const query = { _id: ObjectID(id) };
            const result = await products.deleteOne(query);
            res.json(result)
            console.log('Product Deleted Successfully', result)
        })



        app.put('/orders', async (req, res) => {
            const id = req.body._id;
            console.log(id);
            const query = { _id: ObjectID(id) };
            const options = { upsert: true };

            const updateDoc = {
                $set:
                {
                    status: "Approved"
                }

            };

            const result = await orders.updateOne(query, updateDoc);
            // console.log("got new user", req.body);
            console.log("package approved", result);
            res.json(result);
        });

        app.put('/users', async (req, res) => {
            const id = req.body._id;
            console.log(id);
            const query = { _id: ObjectID(id) };
            const options = { upsert: true };

            const updateDoc = {
                $set:
                {
                    role: "Admin"
                }

            };

            const result = await users.updateOne(query, updateDoc);
            // console.log("got new user", req.body);
            console.log("package approved", result);
            res.json(result);
        });


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);




app.listen(port, () => {
    console.log("Node Listening From port:", port)
});

// this is the end