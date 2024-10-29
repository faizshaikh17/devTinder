const express = require('express');
const app = express();
const port = 3000;

const { dbConnection } = require('./config/database');

const { User } = require("./models/user");

dbConnection()
    .then(() => {
        console.log('Database connected');
        app.listen(port, () => console.log('server running'));
    })
    .catch((err) => console.log('Database not connected'));


app.post('/signup', async (req, res) => {
    const userObj = {
        firstName: "Faiz",
        lastName: "Shaikh",
        age: "23",
        emailId: "faiz.shaikh.com",
        password: "F@iz0017"
    };
    const user = new User(userObj);
    await user.save();

    res.send('user added!!')

});

