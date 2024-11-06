const express = require('express');
const { userAuth } = require('../middlewares/auth');
const requestRouter = express.Router();
const ConnectionRequest = require('../models/connectionRequest');
const User = require("../models/user");
const mongoose = require('mongoose');


requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {

    try {

        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        // const toUserId = new mongoose.Types.ObjectId(req.params.toUserId);
        const status = req.params.status;

        console.log(fromUserId)
        console.log(toUserId)

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const allowedStatus = ["interested", "ignored"];
        if (!allowedStatus.includes(status)) {
            throw new Error("Status not valid");
        }
        console.log(req.user._id)

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]

        })

        if (existingConnectionRequest) {
            throw new Error("Already sent request")
        }

        const toUserExist = await User.findById({ _id: toUserId })
        if (!toUserExist) {
            throw new Error("User not found")
        }

        const data = await connectionRequest.save();
        console.log(req.user.firstName)
        res.json({
            message: `${req.user.firstName} ${status} ${toUserExist.firstName}`,
            data,
        });
    } catch (error) {
        res.status(400).send(error.message);
    }


});

module.exports = requestRouter;