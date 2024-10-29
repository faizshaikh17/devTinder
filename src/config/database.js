const mongoose = require('mongoose');

const dbConnection = async () => {
    await mongoose.connect("mongodb+srv://node:dgCxcaMQyOU5RtBA@node.tabkb.mongodb.net/devTinder");
}

// dbConnection().then(() => console.log('Database connected')).catch(() => console.log('Database not connected'))

module.exports = { dbConnection }; 