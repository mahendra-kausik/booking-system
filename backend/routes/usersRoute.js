const express = require('express');
const router = express.Router();

const User = require("../models/user");

router.post("/register", async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    try {
        const savedUser = await newUser.save();
        res.send("User registered successfully!");
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const existedUser = await User.findOne({
            email: email,
            password: password
        });

        if (existedUser) {
            const userData = {
                name: existedUser.name,
                email: existedUser.email,
                isAdmin: existedUser.isAdmin,
                _id: existedUser._id,
            }
            res.send(userData);
        } else {
            return res.status(400).json({ message: "Login failed!" });
        }

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.get("/getAllUsers", async (req, res) => {
    try {
        const currentUsers = await User.find();
        res.send(currentUsers);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;