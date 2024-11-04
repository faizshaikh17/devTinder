const validator = require('validator');
const isUserValidated = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Enter the valid data");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("EmailId not valid!");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Password not valid!");
    }
}

const validateUserProfileData = (req) => {
    const allowedUpdates = ["firstName", "lastName", "age", "gender", "skills"];
    const isUpdateAllowed = Object.keys(req.body).every(key => allowedUpdates.includes(key));
    console.log(isUpdateAllowed)

    if (!isUpdateAllowed) {
        throw new Error("Update not allowed")
    }
    return isUpdateAllowed
}

module.exports = { isUserValidated, validateUserProfileData }