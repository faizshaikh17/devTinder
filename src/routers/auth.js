const express = require('express');
const User = require('../models/user')
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const { isUserValidated } = require("../utils/validation");


authRouter.post('/signup', async (req, res) => {

    //Validation
    try {
        const { firstName, lastName, emailId, password } = req.body
        isUserValidated(req);
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashPassword,
        });
        await user.save();
        res.send('user added!!')
    }
    catch (err) {
        res.status(400).send(err.message);

    }

});


authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        // const cookies = req.cookies;

        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid Credentials")
        }

        const isPasswordValid = await user.validatePassword(password);

        if (!isPasswordValid) {
            throw new Error("Invalid Credentials")
        }

        const token = await user.getJWT();
        // console.log(token);

        if (!token) {
            throw new Error("Token not valid")
        }

        res.cookie("token", token);
        res.send("user Found")

    } catch (error) {
        res.status(400).send(error.message)
    }
});

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, { expires: new Date(Date.now()) }).send("User Logged Out")
})


module.exports = authRouter;
