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

const validateUpdatePassword = async (req) => {

    const allowedUpdate = ["password", "newPassword"];
    const isUpdateAllowed = Object.keys(req.body).every(key => allowedUpdate.includes(key));
    console.log(isUpdateAllowed)
    return isUpdateAllowed;
}

const validateForgotPassword = async (req) => {

    const allowedUpdate = ["emailId", "newPassword"];
    const isUpdateAllowed = Object.keys(req.body).every(key => allowedUpdate.includes(key));
    console.log(isUpdateAllowed);
    return isUpdateAllowed;

}


module.exports = { isUserValidated, validateUserProfileData, validateUpdatePassword, validateForgotPassword }