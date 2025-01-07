const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors')
const { dbConnection } = require('./config/database');
const { ReturnDocument } = require('mongodb');
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true, }));

const authRouter = require('./routers/auth');
const profileRouter = require('./routers/profile');
const requestRouter = require('./routers/request');
const userRouter = require('./routers/user');

dbConnection()
    .then(() => {
        console.log('Database connected');
        app.listen(port, () => console.log('server running'));
    })
    .catch((err) => console.log('Database not connected'));


app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);