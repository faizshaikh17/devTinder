const { error } = require('console');
const express = require('express');
const port = 3000;

const fs = require('fs')

const app = express();

const { adminAuthentication } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorhandler');

const dbConnection = require('./config/database');

app.use('/', errorHandler);

dbConnection()
    .then(() => {
        console.log('Database connected')
        app.listen(port, () => console.log('server running'));
    })
    .catch(() => console.log('Database not connected'))

