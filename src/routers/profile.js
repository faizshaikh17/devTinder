const express = require('express');
const User = require('../models/user')
const profileRouter = express.Router();
const bcrypt = require('bcrypt');
const { userAuth } = require('../middlewares/auth');
const { validateUserProfileData, validateUpdatePassword, validateForgotPassword } = require('../utils/validation')


profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        validateUserProfileData(req);

        // ----------------Method 1------------------

        // const { _id } = req.body;          {requires _id data}
        // const user = await User.findByIdAndUpdate({ _id: _id }, req.body);
        // await user.save();

        // ----------------Method 2------------------

        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key])
        await loggedInUser.save();
        res.send(`${loggedInUser.firstName} profile updated`);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

profileRouter.patch("/profile/updatepassword", userAuth, async (req, res) => {
    try {
        validateUpdatePassword(req);

        const loggedInUser = req.user;
        const { password, newPassword } = req.body;
        const hashPassword = loggedInUser.password;
        const isPasswordMatched = await bcrypt.compare(password, hashPassword);
        if (!isPasswordMatched) {
            throw new Error("Ivalid Password")
        }
        loggedInUser.password = await bcrypt.hash(newPassword, 10);
        await loggedInUser.save();
        res.send("Password Updated")
    } catch (error) {
        res.status(400).send(error.message);
    }
})

profileRouter.patch("/profile/forgotpassword", userAuth, async (req, res) => {
    try {

        if (!validateForgotPassword(req)) {
            throw new Error("Enter valid fields")
        }

        const loggedInUser = req.body;

        const { emailId, newPassword } = loggedInUser;

        const userMatchedData = await User.findOne({ emailId: emailId })

        if (userMatchedData == null) {
            throw new Error("Email not found")
        }

        userMatchedData.password = await bcrypt.hash(newPassword, 10);

        userMatchedData.save();

        res.send("Password Updated")

    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = profileRouter;
