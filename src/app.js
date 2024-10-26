const express = require('express');
const port = 3000;

const app = express();

app.use('/', (req, res) => {
    res.send("MaximumEffort!!")
})


app.listen(port);