const router = require('express').Router();
const cryptoJS = require('crypto-js');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const User = require('../models/User');


//REGISTER USER
router.post('/register', async (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.email) {
        res.status(400).json("Please fill the required inputs!")
    } else {
        const newUser = new User({
            username: req.body.username,
            password: cryptoJS.AES.encrypt(req.body.password, process.env.CRYPTOJSKEY),
            email: req.body.email
        })
        try {
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(500).json(error)
        }
    }
})


//LOGIN
router.get('/login', async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json("Please fill the required inputs!")
    } else {
        try {
            const user = await User.findOne({ username: req.body.username });

            // !user && res.status(401).json("Wrong Credientials!");
            if (!user) {
                return res.status(401).json("Wrong Credientials!");
            }

            const hashedPassword = cryptoJS.AES.decrypt(user.password, process.env.CRYPTOJSKEY);
            const userPassword = hashedPassword.toString(cryptoJS.enc.Utf8);

            // userPassword !== req.body.password && res.status(401).json("Wrong Credientials!");
            if (userPassword !== req.body.password) {
                return res.status(401).json("Wrong Credientials!");
            }

            const accessToken = jwt.sign({
                id: user._id, isAdmin: user.isAdmin,
            }, process.env.JWTKEY,
                { expiresIn: '7d' });

            const { password, ...others } = user._doc;

            res.status(200).json({ others, accessToken });
        } catch (error) {
            res.status(500).json(error);
        }
    }
})

module.exports = router;