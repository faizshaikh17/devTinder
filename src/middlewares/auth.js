const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        const decodedObj = await jwt.verify(token, "devTinder");
        const { _id } = decodedObj;
        const user = await User.findById(_id);
        req.user = user;
        if (!user) {
            throw new Error("user not found")
        }
        next();
    } catch (err) {
        res.status(400).send(err.message);
    }

}

module.exports = { userAuth }