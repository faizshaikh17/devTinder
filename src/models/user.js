const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    age: {
        type: Number
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    }
});

const User = mongoose.model("User", userSchema)

module.exports = { User };