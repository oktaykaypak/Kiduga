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
        res.send(await client.db('Kiduga').collection('HaftalikBebekGelisimi').find({}).toArray())
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
        res.send(await client.db('Kiduga').collection('HaftalikBebekGelisimi').find({ _id: new mongodb.ObjectID(req.params.id) }).toArray())
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
        await client.db('Kiduga').collection('HaftalikBebekGelisimi').updateMany({ _id: new mongodb.ObjectID(req.body.id) }, {
            $set: {
                detail: { tr: { name: req.body.name, desc: req.body.desc }, en: { name: req.body.nameEn, desc: req.body.descEn } },
                row_number: mongodb.Int32(req.body.row_number)

            }
        })
        res.status(200).send();
    } catch { res.status(400).send(); } finally { client.close() }
});

//* UPDATE METODU
router.put('/2', async(req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://kiduga:freelanceristanbul@kiduga.nrmnk.mongodb.net/Kiduga?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    try {
        await client.db('Kiduga').collection('HaftalikBebekGelisimi').updateMany({ _id: new mongodb.ObjectID(req.body.id) }, {

            $set: { //!Array i seçerken TPid kullanılacak
                ["photos." + req.body.photoId + ".type"]: req.body.type,
                ["photos." + req.body.photoId + ".row_number"]: req.body.row_number
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

    var id;
    var deger;
    try {
        deger = await client.db('Kiduga').collection('HaftalikBebekGelisimi').find().sort({ row_number: -1 }).limit(1).toArray()
        deger = deger[0].row_number
        deger += 1
    } catch { deger = 1 }
    await client.db('Kiduga').collection('HaftalikBebekGelisimi').insertOne({

        detail: { tr: { name: req.body.name, desc: req.body.desc }, en: { name: req.body.nameEn, desc: req.body.descEn } },
        row_number: mongodb.Int32(deger)

    }, function(err, docsInserted) {
        id = docsInserted.insertedId;
        res.status(200).json({
            id: id
        });
    })



});


//* POST METODU
router.post('/2', async(req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://kiduga:freelanceristanbul@kiduga.nrmnk.mongodb.net/Kiduga?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    await client.db('Kiduga').collection('HaftalikBebekGelisimi').updateMany({ _id: new mongodb.ObjectID(req.body.id) }, {
        $push: {
            "photos": {
                img_url: req.body.img_url,
                type: req.body.type,
                row_number: req.body.row_number,
            }
        }
    })
    res.status(200).send();

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
        try {
            oyuncak = await client.db('Kiduga').collection('HaftalikBebekGelisimi').find({ _id: new mongodb.ObjectID(req.query.id) }).toArray()
            for (let index = 0; index < oyuncak[0].photos.length; index++) {
                try {
                    filepathname = oyuncak[0].photos[index].img_url
                    filepathname = filepathname.substring(12)
                    imagepath = path.join(__dirname, `../../uploads/${filepathname}`)
                    fs.unlinkSync(`${imagepath}`);
                } catch { console.log("Görsel Bulunamadı!!!") }
            }
        } catch {}
        await client.db('Kiduga').collection('HaftalikBebekGelisimi').deleteOne({ _id: new mongodb.ObjectID(req.query.id) })
        res.status(200).send();
    } catch {
        res.status(400).send();
    } finally {
        client.close()
    }
})

router.delete('/2', async(req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://kiduga:freelanceristanbul@kiduga.nrmnk.mongodb.net/Kiduga?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    try {
        try {
            oyuncak = await client.db('Kiduga').collection('HaftalikBebekGelisimi').find({ _id: new mongodb.ObjectID(req.query.id) }).toArray()
            filepathname = oyuncak[0].photos[req.query.photoId].img_url
            filepathname = filepathname.substring(12)
            imagepath = path.join(__dirname, `../../uploads/${filepathname}`)
            fs.unlinkSync(`${imagepath}`);
        } catch { console.log("Görsel Bulunamadı!!!") }

        await client.db('Kiduga').collection('HaftalikBebekGelisimi').updateMany({ _id: new mongodb.ObjectID(req.query.id) }, {
            $unset: {
                ["photos." + req.query.photoId]: req.query.photoId
            }
        });

        await client.db('Kiduga').collection('HaftalikBebekGelisimi').updateMany({ _id: new mongodb.ObjectID(req.query.id) }, {
            $pull: {
                "photos": null
            }
        });

        res.status(200).send();
    } catch {
        res.status(400).send();
    } finally {
        client.close()
    }
})

module.exports = router;