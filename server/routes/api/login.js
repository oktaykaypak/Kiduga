const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const jwt = require('jsonwebtoken');


router.post('/', async(req, res) => {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://kiduga:freelanceristanbul@kiduga.nrmnk.mongodb.net/Kiduga?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    try {
        const { email, password } = req.body
        client.db('Kiduga').collection('Admins').findOne({ email: req.body.email }, (error, user) => {
            if (user) {
                if (user.password === password) {

                    let token = jwt.sign({
                            userId: user._id,
                            email: user.email
                        }, 'nz4FtNU5pRyA735rguwfP4XY') //!Secretkey i sonra zor bir şey ile değiştir çok önemli !!!!!!

                    client.db('Kiduga').collection('Tokens').insertOne({
                        token: token,
                        userId: user._id
                    })

                    return res.status(200).json({
                        title: 'Giriş Başarılı',
                        token: token
                    })


                } else {
                    return res.status(401).json({
                        title: 'Eposta adresi veya şifre yanlış girilmiştir, lütfen kontrol ediniz.',
                        error: 'Eposta adresi veya şifre yanlış girilmiştir, lütfen kontrol ediniz.'
                    })
                }
            } else {
                return res.status(401).json({
                    title: 'Eposta adresi veya şifre yanlış girilmiştir, lütfen kontrol ediniz.',
                    error: 'Eposta adresi veya şifre yanlış girilmiştir, lütfen kontrol ediniz.'
                })
            }
        })


    } catch {} finally {}
})

router.post('/2', async(req, res) => {
    try {
        const client = await mongodb.MongoClient.connect(
            'mongodb+srv://kiduga:freelanceristanbul@kiduga.nrmnk.mongodb.net/Kiduga?retryWrites=true&w=majority', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        client.db('Kiduga').collection('Tokens').findOne({ token: req.body.token }, (error, user) => {
            if (user) {
                client.close()
                return res.status(200).json({
                    title: 'Token Doğrulandı'
                })

            } else {
                client.close()
                return res.status(401).json({
                    title: 'Doğrulanmamış Token',
                    error: 'Doğrulanmamış Token'
                })
            }
        })


    } catch {}
})

module.exports = router;