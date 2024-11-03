const mongoose = require('mongoose')
const validator = require('validator')
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
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email not valid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Password not Strong");
            }
        }
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

module.exports = User;