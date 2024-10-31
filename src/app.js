const express = require('express');
const app = express();
const port = 3000;

const { dbConnection } = require('./config/database');

const { User } = require("./models/user");

dbConnection()
    .then(() => {
        console.log('Database connected');
        app.listen(port, () => console.log('server running'));
    })
    .catch((err) => console.log('Database not connected'));

app.use(express.json());

app.get('/user', async (req, res) => {

    try {
        const userEmailId = req.body.emailId;
        const user = await User.find({ emailId: userEmailId });
        res.send(user);
    }
    catch {
        res.status(400).send("Something went wrong");
    }
});

app.get("/userId", async (req, res) => {
    try {
        const userId = req.body._id;
        const user = await User.findById({ _id: userId })
        res.send(user)
    } catch (error) {
        res.status(400).send("Something went wrong");
    }
})


app.get('/userOne', async (req, res) => {

    try {
        const userLastName = req.body.lastName;
        const user = await User.findOne({ lastName: userLastName });
        res.send(user);
    }
    catch {
        res.status(400).send("Something went wrong");
    }
});


app.delete("/userDelete", async (req, res) => {
    try {
        const userDelId = req.body._id;
        const user = await User.deleteMany({});
        res.send(user);
    } catch (error) {
        res.status(400).send("Something went wrong");
    }
})

app.put("/userUpdate", async (req, res) => {
    try {
        const userUpdate = req.body.firstName;
        const user = await User.updateMany({ firstName: userUpdate });
        res.send(user);
    } catch (error) {
        res.status(400).send("Something went wrong");
    }
})

app.patch("/userPatch", async (req, res) => {
    try {
        const userFirstName = req.body.firstName;
        const userId = req.body._id;
        const user = await User.findByIdAndUpdate(userId, { firstName: userFirstName });
        res.send("upadted Succesfully!!");
    } catch (error) {
        res.status(400).send("Something went wrong");
    }
})


app.post('/signup', async (req, res) => {

    try {
        const user = new User(req.body);
        await user.save();

        res.send('user added!!')
    }
    catch (err) {
        res.status(400).send(err.message);

    }

});

