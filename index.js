const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vtfbuf5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const addTasksCollection = client.db('taskWorld').collection('addTask');

        app.get('/addTask', async (req, res) => {
            const query = {};
            const addTask = await addTasksCollection.find(query).toArray();
            res.send(addTask)
        })

        app.post('/addTask', async (req, res) => {
            const AddTask = req.body;
            const result = await addTasksCollection.insertOne(AddTask);
            res.send(result)
        })

        // delete task
        app.delete('/addTask/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await addTasksCollection.deleteOne(filter)
            res.send(result);
        })

    }
    finally {

    }
}
run().catch(console.log);



app.get('/', async (req, res) => {
    res.send('task1 server is running');
})

app.listen(port, () => console.log(`Task1 server running on ${port}`))