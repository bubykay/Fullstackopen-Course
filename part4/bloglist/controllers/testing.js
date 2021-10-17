const testRouter = require('express').Router();

const Blog = require('../model/blog');
const User = require('../model/user');

testRouter
    .get('/', (req, res) => {
        res.status(200).send('welcome');
    })
    .post('/reset', async (req, res) => {
        await Blog.deleteMany({});
        await User.deleteMany({});
        res.status(204).end();
    });

module.exports = testRouter;
