const express = require('express');
const { userAuth } = require('../middlewares/auth');
const requestRouter = express.Router();


requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {

    const user = req.user;

    res.send(user.firstName + " Connection")
});

module.exports = requestRouter;
