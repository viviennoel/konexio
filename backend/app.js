const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Users = require('./routes/Users.js');
const path = require('path');
const app = express();

//Connect à MongoDB
mongoose.connect('mongodb+srv://viviennoel:konexiotest13@konexiotest.pjx6f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//Allow access crossed origins
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//bodyParser
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/users', Users);


module.exports = app;