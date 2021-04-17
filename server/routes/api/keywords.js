const express = require('express');
const app = express();
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const router = express.Router();
const fs = require('fs');
const path = require('path');
//* Keywords All
router.get('/', async(req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://kiduga:freelanceristanbul@kiduga.nrmnk.mongodb.net/Kiduga?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    try {
        res.send(await client.db('Kiduga').collection('Keywords').find({ _id: new mongodb.ObjectID('5ff20234463ad23fefbe5000') }).toArray())
    } catch { res.status(400).send(); } finally { client.close() }
});
//* Keywords Api
router.get('/2', async(req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://kiduga:freelanceristanbul@kiduga.nrmnk.mongodb.net/Kiduga?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    try {
        res.send(await client.db('Kiduga').collection('Keywords').find({ _id: new mongodb.ObjectID('5ff208e4b8abad0f96e344a1') }).toArray())
    } catch { res.status(400).send(); } finally { client.close() }
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

    oyuncak = await client.db('Kiduga').collection('Keywords').find({ _id: new mongodb.ObjectID('5ff20234463ad23fefbe5000') }).toArray()

    if (req.body.img_url != null) {
        try {
            filepathname = oyuncak[0].banner
            filepathname = filepathname.substring(12)
            imagepath = path.join(__dirname, `../../uploads/${filepathname}`)
            fs.unlinkSync(`${imagepath}`);
            img_url = req.body.img_url
        } catch { img_url = req.body.img_url }
    } else {
        img_url = oyuncak[0].banner
    }


    await client.db('Kiduga').collection('Keywords').updateMany({ _id: new mongodb.ObjectID('5ff20234463ad23fefbe5000') }, {
        $set: {
            [`banner.${req.body.id}`]:img_url
        }

    }, function(err, docsInserted) {
        id = docsInserted.insertedId;
        res.status(200).json({
            id: id
        });
    })

});

router.put('/uPop', async(req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://deneme:deneme@maykod.wfmbb.mongodb.net/maykod?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    try {
        await client.db('Kiduga').collection('Keywords').updateMany({ _id: new mongodb.ObjectID('5ff20234463ad23fefbe5000') }, {
                $set: { //!Array i seçerken TPid kullanılacak

                    [`api`]: {

                    }
                }
            })
            //
        res.status(200).send();
    } catch { res.status(400).send(); } finally {
        client.close()
    }
    //
});


router.delete('/photo', async(req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://kiduga:freelanceristanbul@kiduga.nrmnk.mongodb.net/Kiduga?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    try {
        oyuncak = await client.db('Kiduga').collection('Keywords').find({ _id: new mongodb.ObjectID(req.query.id) }).toArray()
        try {
            filepathname = oyuncak[0].photos[0].img_url
            filepathname = filepathname.substring(12)
            imagepath = path.join(__dirname, `../../uploads/${filepathname}`)
            fs.unlinkSync(`${imagepath}`);
        } catch {}



        await client.db('Kiduga').collection('Keywords').updateMany({ _id: new mongodb.ObjectID(req.query.id) }, {
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