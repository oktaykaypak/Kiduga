const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const jwt = require('jsonwebtoken');


//! grabing user info
router.get('/', async(req, res, next) => {
    try {

        let token = req.headers.token; //* token
        jwt.verify(token, 'nz4FtNU5pRyA735rguwfP4XY', (err, decoded) => {
            if (err) {
                return res.status(401).send()
            }
            //* token is valid

            return res.status(200).json({
                title: 'user grabbed',
                user: {
                    id: decoded.userId,
                    email: decoded.email
                }
            })

        })
    } catch {}
})


module.exports = router;