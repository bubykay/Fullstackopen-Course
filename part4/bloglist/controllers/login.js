/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const express = require('express');

const loginRouter = express.Router();
const jwt = require('jsonwebtoken');
const bycrpt = require('bcrypt');

const User = require('../model/user');

loginRouter

    .post('/', async (req, res) => {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const passwordCorrect = user === null
            ? false
            : await bycrpt.compare(password, user.password);
        if (!(user && passwordCorrect)) {
            return res.status(401).send('incorrect username/passowrd');
        }

        const userToken = {
            user: user.username,
            id: user._id,
        };

        const token = jwt.sign(userToken, process.env.SECRETE, { expiresIn: 24 * 60 * 60 });

        res.status(200).send({ token, username: user.username, name: user.name });
    });
module.exports = loginRouter;
