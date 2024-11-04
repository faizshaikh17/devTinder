const express = require('express');
const User = require('../models/user')
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const { validateUserProfileData } = require('../utils/validation')


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

module.exports = profileRouter;
