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

module.exports = { isUserValidated }