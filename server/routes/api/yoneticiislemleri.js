const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const fs = require('fs');
const path = require('path');

//* GET METODU
router.get('/', async(req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://kiduga:freelanceristanbul@kiduga.nrmnk.mongodb.net/Kiduga?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    try {
        res.send(await client.db('Kiduga').collection('Admins').find({}).toArray())
    } catch { res.status(400).send(); } finally { client.close() }
});

router.get('/:id', async(req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://kiduga:freelanceristanbul@kiduga.nrmnk.mongodb.net/Kiduga?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    try {
        res.send(await client.db('Kiduga').collection('Admins').find({ _id: new mongodb.ObjectID(req.params.id) }).toArray())
    } catch { res.status(400).send(); } finally { client.close() }
});

//* UPDATE METODU
router.put('/', async(req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://kiduga:freelanceristanbul@kiduga.nrmnk.mongodb.net/Kiduga?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    try {
        await client.db('Kiduga').collection('Admins').updateMany({ _id: new mongodb.ObjectID(req.body.id) }, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password
            }
        })
        res.status(200).send();
    } catch { res.status(400).send(); } finally { client.close() }
});

//* POST METODU
router.post('/', async(req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://kiduga:freelanceristanbul@kiduga.nrmnk.mongodb.net/Kiduga?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    await client.db('Kiduga').collection('Admins').insertOne({

        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password

    }, function(err, docsInserted) {
        id = docsInserted.insertedId;
        res.status(200).json({
            id: id
        });
    })

});

//* DELETE METODU
router.delete('/', async(req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://kiduga:freelanceristanbul@kiduga.nrmnk.mongodb.net/Kiduga?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    try {
        await client.db('Kiduga').collection('Admins').deleteOne({ _id: new mongodb.ObjectID(req.query.id) })
        res.status(200).send();
    } catch {
        res.status(400).send();
    } finally {
        client.close()
    }
})


module.exports = router;