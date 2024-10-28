const { error } = require('console');
const express = require('express');
const port = 3000;
const fs = require('fs')

const app = express();

const { adminAuthentication } = require('./middlewares/auth');

app.use('/admin', adminAuthentication)

app.get('/admin/getAllData', (req, res) => {
    res.send("All data sent");
})

app.get('/admin/delAllData', (req, res) => {
    res.send("All data deleted");
})

app.get('/user', (req, res) => {
    res.send("hello");
})


app.listen(port);