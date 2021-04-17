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
        res.send(await client.db('Kiduga').collection('Blog').find({}).toArray())
    } catch { res.status(400).send(); } finally { client.close() }
});

router.get('/categories', async(req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://kiduga:freelanceristanbul@kiduga.nrmnk.mongodb.net/Kiduga?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    try {
        res.send(await client.db('Kiduga').collection('BlogCategories').find({}).toArray())
    } catch { res.status(400).send(); } finally { client.close() }
});

router.get('/categories/:id', async(req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://kiduga:freelanceristanbul@kiduga.nrmnk.mongodb.net/Kiduga?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    try {
        res.send(await client.db('Kiduga').collection('BlogCategories').find({ _id: new mongodb.ObjectID(req.params.id) }).toArray())
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
        res.send(await client.db('Kiduga').collection('Blog').find({ _id: new mongodb.ObjectID(req.params.id) }).toArray())
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

        await client.db('Kiduga').collection('Blog').updateMany({ _id: new mongodb.ObjectID(req.body.id) }, {
            $set: {
                detail: { tr: { name: req.body.name, desc: req.body.desc }, en: { name: req.body.nameEn, desc: req.body.descEn } },
                category: new mongodb.ObjectID(req.body.categoryId),
                showInPage: Boolean(req.body.showInPage),
                startDate: mongodb.Int32(req.body.startDate),
                endDate: mongodb.Int32(req.body.endDate),
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
        await client.db('Kiduga').collection('Blog').updateMany({ _id: new mongodb.ObjectID(req.body.id) }, {

            $set: { //!Array i seçerken TPid kullanılacak
                detail: { tr: { name: req.body.name, desc: req.body.desc, mp3_url: req.body.mp3_url }, en: { name: req.body.nameEn, desc: req.body.descEn, mp3_url: req.body.mp3_url2 } },
                photos: [{ img_url: req.body.img_url, type: "list" }, { img_url: req.body.img_url2, type: "detail" }]
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

    var deger
    try {

        deger = await client.db('Kiduga').collection('Blog').find().sort({ row_number: -1 }).limit(1).toArray()
        deger = deger[0].row_number
        deger += 1
    } catch { deger = 1 }
    await client.db('Kiduga').collection('Blog').insertOne({

        detail: { tr: { name: req.body.name, desc: req.body.desc }, en: { name: "", desc: "" } },
        category: new mongodb.ObjectID(req.body.categoryId),
        photos: [{ img_url: "" }],
        row_number: mongodb.Int32(deger)


    }, function(err, docsInserted) {
        id = docsInserted.insertedId;
        res.status(200).json({
            id: id
        });
    })

});

//* POST METODU
router.post('/addcategory', async(req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://kiduga:freelanceristanbul@kiduga.nrmnk.mongodb.net/Kiduga?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    await client.db('Kiduga').collection('BlogCategories').insertOne({

        detail: { tr: { name: req.body.name }, en: { name: "" } },

    }, function(err, docsInserted) {
        id = docsInserted.insertedId;
        res.status(200).json({
            id: id
        });
    })

});

//* POST METODU
router.put('/mp3', async(req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://kiduga:freelanceristanbul@kiduga.nrmnk.mongodb.net/Kiduga?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    var mp3_url, mp3_url2, name, nameEn, desc, descEn

    oyuncak = await client.db('Kiduga').collection('Blog').find({ _id: new mongodb.ObjectID(req.body.id) }).toArray()

    if (req.body.mp3_url != null) {
        try {
            filepathname = oyuncak[0].detail.tr.mp3_url
            filepathname = filepathname.substring(12)
            imagepath = path.join(__dirname, `../../uploads/${filepathname}`)
            fs.unlinkSync(`${imagepath}`);
            mp3_url = req.body.mp3_url
        } catch { mp3_url = req.body.mp3_url }
    } else {
        mp3_url = oyuncak[0].detail.tr.mp3_url
    }

    if (req.body.mp3_url2 != null) {
        try {
            filepathname2 = oyuncak[0].detail.en.mp3_url
            filepathname2 = filepathname2.substring(12)
            imagepath = path.join(__dirname, `../../uploads/${filepathname2}`)
            fs.unlinkSync(`${imagepath}`);
            mp3_url2 = req.body.mp3_url2
        } catch { mp3_url2 = req.body.mp3_url2 }
    } else {
        mp3_url2 = oyuncak[0].detail.en.mp3_url
    }

    name = oyuncak[0].detail.tr.name
    nameEn = oyuncak[0].detail.en.name
    desc = oyuncak[0].detail.tr.desc
    descEn = oyuncak[0].detail.en.desc

    await client.db('Kiduga').collection('Blog').updateMany({ _id: new mongodb.ObjectID(req.body.id) }, {
        $set: {
            detail: { tr: { name: name, desc: desc, mp3_url: mp3_url }, en: { name: nameEn, desc: descEn, mp3_url: mp3_url2 } }
        }



    }, function(err, docsInserted) {
        id = docsInserted.insertedId;
        res.status(200).json({
            id: id
        });
    })

});

router.put('/category', async(req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://kiduga:freelanceristanbul@kiduga.nrmnk.mongodb.net/Kiduga?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    await client.db('Kiduga').collection('BlogCategories').updateMany({ _id: new mongodb.ObjectID(req.body.id) }, {
        $set: {
            detail: { tr: { name: req.body.name }, en: { name: req.body.nameEn } }
        }
    })

});

//* POST METODU
router.put('/photo', async(req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://kiduga:freelanceristanbul@kiduga.nrmnk.mongodb.net/Kiduga?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    var img_url

    oyuncak = await client.db('Kiduga').collection('Blog').find({ _id: new mongodb.ObjectID(req.body.id) }).toArray()

    if (req.body.img_url != null) {
        try {
            filepathname = oyuncak[0].detail.tr.img_url
            filepathname = filepathname.substring(12)
            imagepath = path.join(__dirname, `../../uploads/${filepathname}`)
            fs.unlinkSync(`${imagepath}`);
            img_url = req.body.img_url
        } catch { img_url = req.body.img_url }
    } else {
        img_url = oyuncak[0].photos[0].img_url
    }


    await client.db('Kiduga').collection('Blog').updateMany({ _id: new mongodb.ObjectID(req.body.id) }, {
        $set: {
            photos: [{
                img_url: img_url,
            }]
        }

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

    await client.db('Kiduga').collection('Blog').updateMany({ _id: new mongodb.ObjectID(req.body.id) }, {
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
            oyuncak = await client.db('Kiduga').collection('Blog').find({ _id: new mongodb.ObjectID(req.query.id) }).toArray()
            for (let index = 0; index < oyuncak[0].photos.length; index++) {
                try {
                    filepathname = oyuncak[0].photos[index].img_url
                    filepathname = filepathname.substring(12)
                    imagepath = path.join(__dirname, `../../uploads/${filepathname}`)
                    fs.unlinkSync(`${imagepath}`);
                } catch { console.log("Görsel Bulunamadı!!!") }
            }
            filepathname = oyuncak[0].detail.tr.mp3_url
            filepathname = filepathname.substring(12)
            imagepath = path.join(__dirname, `../../uploads/${filepathname}`)
            fs.unlinkSync(`${imagepath}`);

            filepathname2 = oyuncak[0].detail.en.mp3_url
            filepathname2 = filepathname2.substring(12)
            imagepath = path.join(__dirname, `../../uploads/${filepathname2}`)
            fs.unlinkSync(`${imagepath}`);
        } catch {}
        await client.db('Kiduga').collection('Blog').deleteOne({ _id: new mongodb.ObjectID(req.query.id) })
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
        oyuncak = await client.db('Kiduga').collection('Blog').find({ _id: new mongodb.ObjectID(req.query.id) }).toArray()
        try {

            for (let index = 0; index < oyuncak[0].photos.length; index++) {
                try {
                    filepathname = oyuncak[0].photos[index].img_url
                    filepathname = filepathname.substring(12)
                    imagepath = path.join(__dirname, `../../uploads/${filepathname}`)
                    fs.unlinkSync(`${imagepath}`);
                } catch { console.log("Görsel Bulunamadı!!!") }
            }
            filepathname = oyuncak[0].detail.tr.mp3_url
            filepathname = filepathname.substring(12)
            imagepath = path.join(__dirname, `../../uploads/${filepathname}`)
            fs.unlinkSync(`${imagepath}`);

            filepathname2 = oyuncak[0].detail.en.mp3_url
            filepathname2 = filepathname2.substring(12)
            imagepath = path.join(__dirname, `../../uploads/${filepathname2}`)
            fs.unlinkSync(`${imagepath}`);
        } catch {}

        await client.db('Kiduga').collection('Blog').updateMany({ _id: new mongodb.ObjectID(req.query.id) }, {
            $set: {
                detail: { tr: { name: oyuncak[0].detail.tr.name, desc: oyuncak[0].detail.tr.desc }, en: { name: oyuncak[0].detail.en.name, desc: oyuncak[0].detail.en.desc } },
                photos: [{ img_url: "", type: "" }, { img_url: "", type: "" }]
            }
        });

        res.status(200).send();
    } catch {
        res.status(400).send();
    } finally {
        client.close()
    }
})

router.delete('/categories', async(req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://kiduga:freelanceristanbul@kiduga.nrmnk.mongodb.net/Kiduga?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    try {
        await client.db('Kiduga').collection('BlogCategories').deleteMany({ _id: new mongodb.ObjectID(req.query.id) })

        res.status(200).send();
    } catch {
        res.status(400).send();
    } finally {
        client.close()
    }
})

router.delete('/mp3', async(req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://kiduga:freelanceristanbul@kiduga.nrmnk.mongodb.net/Kiduga?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    try {
        oyuncak = await client.db('Kiduga').collection('Blog').find({ _id: new mongodb.ObjectID(req.query.id) }).toArray()
        try {
            filepathname = oyuncak[0].detail.tr.mp3_url
            filepathname = filepathname.substring(12)
            imagepath = path.join(__dirname, `../../uploads/${filepathname}`)
            fs.unlinkSync(`${imagepath}`);

            filepathname2 = oyuncak[0].detail.en.mp3_url
            filepathname2 = filepathname2.substring(12)
            imagepath = path.join(__dirname, `../../uploads/${filepathname2}`)
            fs.unlinkSync(`${imagepath}`);
        } catch {}

        await client.db('Kiduga').collection('Blog').updateMany({ _id: new mongodb.ObjectID(req.query.id) }, {
            $set: {
                detail: { tr: { name: oyuncak[0].detail.tr.name, desc: oyuncak[0].detail.tr.desc }, en: { name: oyuncak[0].detail.en.name, desc: oyuncak[0].detail.en.desc } },
                photos: [{ img_url: oyuncak[0].photos[0].img_url, type: oyuncak[0].photos[0].type }, { img_url: oyuncak[0].photos[1].img_url, type: oyuncak[0].photos[1].type }]
            }
        });

        res.status(200).send();
    } catch {
        res.status(400).send();
    } finally {
        client.close()
    }
})

router.delete('/photo', async(req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://kiduga:freelanceristanbul@kiduga.nrmnk.mongodb.net/Kiduga?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    try {
        oyuncak = await client.db('Kiduga').collection('Blog').find({ _id: new mongodb.ObjectID(req.query.id) }).toArray()
        try {
            filepathname = oyuncak[0].photos[0].img_url
            filepathname = filepathname.substring(12)
            imagepath = path.join(__dirname, `../../uploads/${filepathname}`)
            fs.unlinkSync(`${imagepath}`);
        } catch {}



        await client.db('Kiduga').collection('Blog').updateMany({ _id: new mongodb.ObjectID(req.query.id) }, {
            $set: {
                photos: [{ img_url: "" }]
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