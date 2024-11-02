const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 20
    },
    age: {
        type: Number,
        maxLength: 60,
        minLength: 21
    },
    emailId: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender is not Valid")
            }
        }
    },
    skills: {
        type: [String],
        default: "Javascript",
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema)

module.exports = { User };