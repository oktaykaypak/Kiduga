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
        res.send(await client.db('Kiduga').collection('Users').find({}).toArray())
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
        res.send(await client.db('Kiduga').collection('Users').find({ _id: new mongodb.ObjectID(req.params.id) }).toArray())
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
    oyuncak = await client.db('Kiduga').collection('Users').find({ _id: new mongodb.ObjectID(req.body.id) }).toArray()
    try {
        await client.db('Kiduga').collection('Users').updateMany({ _id: new mongodb.ObjectID(req.body.id) }, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone

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
    oyuncak = await client.db('Kiduga').collection('Users').find({ _id: new mongodb.ObjectID(req.body.id) }).toArray()

    try {

        if (req.body.img_url != null) {

            try {
                oyuncak = await client.db('Kiduga').collection('Users').find({ _id: new mongodb.ObjectID(req.body.id) }).toArray()
                filepathname = oyuncak[0].children[req.body.arrayId].img_url
                filepathname = filepathname.substring(12)
                imagepath = path.join(__dirname, `../../uploads/${filepathname}`)
                fs.unlinkSync(`${imagepath}`);
            } catch { console.log("Görsel Bulunamadı!!!") }

            await client.db('Kiduga').collection('Users').updateMany({ _id: new mongodb.ObjectID(req.body.id) }, {
                $set: {
                    ["children." + req.body.arrayId + ".name"]: req.body.name,
                    ["children." + req.body.arrayId + ".dateofbirth"]: req.body.dateofbirth,
                    ["children." + req.body.arrayId + ".gender"]: req.body.gender,
                    ["children." + req.body.arrayId + ".img_url"]: req.body.img_url

                }
            })


        }
        if (req.body.img_url == null) {
            let old_img = oyuncak[0].children[req.body.arrayId].img_url
            await client.db('Kiduga').collection('Users').updateMany({ _id: new mongodb.ObjectID(req.body.id) }, {
                $set: {
                    ["children." + req.body.arrayId + ".name"]: req.body.name,
                    ["children." + req.body.arrayId + ".dateofbirth"]: req.body.dateofbirth,
                    ["children." + req.body.arrayId + ".gender"]: req.body.gender,
                    ["children." + req.body.arrayId + ".img_url"]: old_img

                }
            })
        }


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
    oyuncak = await client.db('Kiduga').collection('Users').find({ _id: new mongodb.ObjectID(req.body.id) }).toArray()

    await client.db('Kiduga').collection('Users').insertOne({

        link: req.body.link,
        detail: { tr: { name: req.body.name, desc: req.body.desc }, en: { name: req.body.nameEn, desc: req.body.descEn } },


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
    oyuncak = await client.db('Kiduga').collection('Users').find({ _id: new mongodb.ObjectID(req.body.id) }).toArray()

    await client.db('Kiduga').collection('Users').updateMany({ _id: new mongodb.ObjectID(req.body.id) }, {
        $push: {
            "children": {
                childId: mongodb.ObjectID().toString(),
                name: req.body.name,
                gender: req.body.gender,
                dateofbirth: req.body.dateofbirth,
                img_url: req.body.img_url
            }
        }
    }, function(err, docsInserted) {

        res.status(200).json({
            id: req.body.id
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
    oyuncak = await client.db('Kiduga').collection('Users').find({ _id: new mongodb.ObjectID(req.query.id) }).toArray()

    try {
        try {
            for (let index = 0; index < oyuncak[0].children.length; index++) {
                try {
                    filepathname = oyuncak[0].children[index].img_url
                    filepathname = filepathname.substring(12)
                    imagepath = path.join(__dirname, `../../uploads/${filepathname}`)
                    fs.unlinkSync(`${imagepath}`);
                } catch { console.log("Görsel Bulunamadı!!!") }
            }
        } catch {}
        await client.db('Kiduga').collection('Users').deleteOne({ _id: new mongodb.ObjectID(req.query.id) })
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
    oyuncak = await client.db('Kiduga').collection('Users').find({ _id: new mongodb.ObjectID(req.query.id) }).toArray()

    try {
        try {
            filepathname = oyuncak[0].children[req.query.childId].img_url
            filepathname = filepathname.substring(12)
            imagepath = path.join(__dirname, `../../uploads/${filepathname}`)
            fs.unlinkSync(`${imagepath}`);
        } catch { console.log("Görsel Bulunamadı!!!") }

        await client.db('Kiduga').collection('Users').updateMany({ _id: new mongodb.ObjectID(req.query.id) }, {
            $unset: {
                ["children." + req.query.childId]: req.query.childId
            }
        });

        await client.db('Kiduga').collection('Users').updateMany({ _id: new mongodb.ObjectID(req.query.id) }, {
            $pull: {
                "children": null
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