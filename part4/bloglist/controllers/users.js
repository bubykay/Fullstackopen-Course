const express = require('express');

const userRouter = express.Router();
const bcrypt = require('bcrypt');

const User = require('../model/user');

userRouter
    .get('/', async (req, res) => {
        const response = await User.find({}).populate('blog', { url: 1, title: 1, author: 1 });
        res.json(response);
    })
    .post('/', async (req, res) => {
        const { username, password, name } = req.body;
        if (!(username && password)) {
            return res.status(400).send('please provide username and password');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userObj = {
            username,
            name,
            password: hashedPassword,
        };
        const user = new User(userObj);
        const savedUser = await user.save();
        res.status(201).send(savedUser);
    })
    .delete('/:id', async (req, res) => {
        const { id } = req.params;
        const response = await User.findByIdAndDelete(id);
        res.status(204).send(response);
    });
module.exports = userRouter;
