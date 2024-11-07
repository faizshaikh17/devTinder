const express = require('express');
const { userAuth } = require('../middlewares/auth');
const { Connection } = require('mongoose');
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");

userRouter.get("/user/request/recieved", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", "firstName lastName");
        console.log(connectionRequest)

        if (connectionRequest == "") {
            throw new Error("user not found");
        }

        res.json({
            message: "this are user requests",
            data: connectionRequest
        })

    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = userRouter;
