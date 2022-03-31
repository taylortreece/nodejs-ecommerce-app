var express = require("express");
const User = require("../models/user");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

router.post('/login', async (req, res, next) => {
    res.send("Login endpoint has been hit.")
})

router.post('/register', async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        console.log(firstName, lastName, email, password)

        if (!(email && password && firstName && lastName)) {
            res.status(400).send("All inputs are required");
        }

        // check if user already exists
        // validate if user exists in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) { 
            return res.status(409).send("User already exists. Please login.");
        }

        // encrypt user password
        encrypedUserPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            first_name: firstName,
            last_name: lastName,
            email: email.toLowerCase(),
            password: encrypedUserPassword
        });

        // create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            { expiresIn: "5h" }
        );

        user.token = token;

        res.status(201).json(user)
    } catch (err) {

        // Add morgan to register error
        console.log(err)
    }
})

module.exports = router;