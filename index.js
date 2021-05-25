const express = require('express');
const app = express();

const port = process.env.PORT || 5000;
app.listen(port);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello word');
});

// app.get('/hello/:name', (req, res) => {
//     res.send(`Hello ${req.params.name}`);
// });

const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@cluster0-shard-00-00.jhmjj.mongodb.net:27017,cluster0-shard-00-01.jhmjj.mongodb.net:27017,cluster0-shard-00-02.jhmjj.mongodb.net:27017/prueba?ssl=true&replicaSet=atlas-5tg1w7-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (error) => {
    console.log("error: ", err);
});

db.once('open', () => {
    console.log('conectado');
});


// app.get('/pets', (req, res) => {
//     res.send('Hello word');
// });

// --------- Models ----------
const petSchema = new mongoose.Schema({
    type: String,
    name: String,
    age: Number
}, { collection: 'pets' })
const Pet = new mongoose.model('Pet', petSchema)

// --------- Controllers ----------

app.get('/pets', (req, res) => {
    Pet.find().then((result) => {
        res.json(result)
    })
})

app.get('/pets/:id', (req, res) => {
    Pet.findById(req.params.id)
        .then((result) => {
            res.json(result)
        })
})

app.put('/pets/:id', (req, res) => {
    Pet.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.json(result)
        })
})

app.post('/pets', (req, res) => {
    Pet.create(req.body).then((result) => {
        res.json(result)
    })
})

app.delete('/pets', (req, res) => {
    Pet.deleteOne(req.body).then((result) => {
        res.json(result)
    })
})

//60a5ce371e4b5c646018e996