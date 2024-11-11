const express = require('express');
const { userAuth } = require('../middlewares/auth');
const { Connection } = require('mongoose');
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user")

userRouter.get("/user/request/recieved", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", "firstName lastName");
        // console.log(connectionRequest)

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

userRouter.get("/user/connection", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            status: "accepted",
            $or: [
                { toUserId: loggedInUser._id },
                { fromUserId: loggedInUser._id }
            ]

        }).populate("fromUserId", "firstName lastName").populate("toUserId", "firstName lastName")

        if (connectionRequest == "") {
            throw new Error("No user found");
        }

        const data = connectionRequest.map((row) => {
            if (row.fromUserId.firstName == loggedInUser.firstName) {
                return row.toUserId.firstName;
            }
            else {
                return row.fromUserId.firstName;
            }
        })

        res.json({
            message: "Your connection data",
            data
        })
    } catch (error) {
        res.status(400).send("No connection found" + error.message)
    }
})

userRouter.get("/user/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const page = req.query.page;
        let limit = req.query.limit;
        limit = limit > 50 ? 50 : limit;

        const connectionRequest = await ConnectionRequest.find({
            $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }]

        }).select("fromUserId toUserId");

        const feedBlockedUser = new Set();
        connectionRequest.forEach(req => {
            feedBlockedUser.add(req.fromUserId.toString());
            feedBlockedUser.add(req.toUserId.toString());
        });

        const user = await User.find({
            $and: [
                { _id: { $ne: loggedInUser._id } },
                { _id: { $nin: Array.from(feedBlockedUser) } }
            ]
        }).select("firstName lastName")
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({
            message: "your feed",
            user
        })

    } catch (error) {
        res.status(400).send("feed not found " + error.message);
    }
})

module.exports = userRouter;
