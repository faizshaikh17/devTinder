const mongoose = require('mongoose');


const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Types.ObjectId,
        required: true,
        index: true
    },
    toUserId: {
        type: mongoose.Types.ObjectId,
        required: true,
        index: true

    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["interested", "ignored", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        }
    },
},
    { timestamps: true }
);

connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cant sent request to yourself MF")
    }
    next();
})

connectionRequestSchema.index({ firstName: 1, lastName: 1 });

module.exports = new mongoose.model("ConnectionRequest", connectionRequestSchema);
