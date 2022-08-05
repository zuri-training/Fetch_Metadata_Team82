const router = require('express').Router();
const cryptoJS = require('crypto-js');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const md5 = require("md5");

dotenv.config();

const User = require('../models/User');
const { verifyTokenAndAuthorization } = require('./verifyToken');


//REGISTER USER
router.post('/register', async (req, res, next) => {
    if (!req.body.username || !req.body.password || !req.body.email) {
        res.status(400).json("Please fill the required inputs!")
    } else {
        const newUser = new User({
            username: req.body.username,
            password: md5(req.body.password),
            email: req.body.email
        })
        try {
            const savedUser = await newUser.save();

            const { password, ...otherUserInfo } = savedUser._doc
            res.status(201).json({ message: "Account Created Successfully!", otherUserInfo });
        } catch (err) {
            return next(err);
        }
    }
})


//LOGIN
router.post('/login', async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).json("Please fill the required inputs!")
    } else {
        try {
            const user = await User.findOne({ email: req.body.email });

            // !user && res.status(401).json("Wrong Credientials!");
            if (!user) {
                return res.status(401).json("Wrong Credientials!");
            }

            const hashedPassword = md5(req.body.password);
            const userPassword = user.password

            // userPassword !== req.body.password && res.status(401).json("Wrong Credientials!");
            if (userPassword !== hashedPassword) {
                return res.status(401).json("Wrong Credientials!");
            }

            const accessToken = jwt.sign({
                id: user._id
            }, process.env.JWTKEY,
                { expiresIn: '7d' });

            const { password, ...userDetails } = user._doc;

            res.status(200).json({ message: "Log In Successful!", userDetails, accessToken });
        } catch (err) {
            return next(err);
        }
    }
})

//UPDATE USER PASSWORD
router.put('/updatepassword/:userId', verifyTokenAndAuthorization, async (req, res) => {
    if (!req.body) {
        res.status(400).json("Please fill the required inputs!")
    } else {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
                password: md5(req.body.password),
            }, { new: true });
            let { password, ...UserData } = updatedUser._doc
            res.status(200).json({ message: "Password Changed Successfully!", UserData });

        } catch (error) {
            res.status(500).json(error);
        }
    }
});

module.exports = router;