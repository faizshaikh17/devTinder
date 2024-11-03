const express = require('express');
const User = require('../models/user')
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');


profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = profileRouter;
