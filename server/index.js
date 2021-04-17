const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload')
const router = express.Router();
const https = require('https');

const app = express();
app.use(express.urlencoded({ extended: false }))

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

const login = require('./routes/api/login')
const user = require('./routes/api/user')

app.use('/api/login', login)
app.use('/api/user', user)

const oyuncaklar = require('./routes/api/oyuncaklar')
const aylikbebekgelisimi = require('./routes/api/aylikbebekgelisimi')
const haftalikbebekgelisimi = require('./routes/api/haftalikbebekgelisimi')
const masallar = require('./routes/api/masallar')
const yoneticiislemleri = require('./routes/api/yoneticiislemleri')
const kullaniciislemleri = require('./routes/api/kullaniciislemleri')
const muzikler = require('./routes/api/muzikler')
const blog = require('./routes/api/blog')
const keywords = require('./routes/api/keywords')
const uploads = require('./routes/api/uploads')
const tarif = require('./routes/api/tarif')

app.use('/api/oyuncaklar', oyuncaklar)
app.use('/api/aylikbebekgelisimi', aylikbebekgelisimi)
app.use('/api/haftalikbebekgelisimi', haftalikbebekgelisimi)
app.use('/api/masallar', masallar)
app.use('/api/yoneticiislemleri', yoneticiislemleri)
app.use('/api/kullaniciislemleri', kullaniciislemleri)
app.use('/api/muzikler', muzikler)
app.use('/api/blog', blog)
app.use('/api/keywords', keywords)
app.use('/api/uploads', uploads)
app.use('/api/tarif', tarif)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'));
    app.get(/.*/, (req, res) => res.sendfile(__dirname + 'index.html'));

}

const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => console.log(`Server started on port ${port}`));