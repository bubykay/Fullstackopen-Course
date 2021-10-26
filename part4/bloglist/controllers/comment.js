const commentRouter = require('express').Router();

const Blog = require('../model/blog');
// const User = require('../model/user');
const Comment = require('../model/comment');
const logger = require('../utils/logger');

commentRouter
    .get('/', async (req, res) => {
        const data = await Comment.find({}).populate('blog').populate('user');
        res.status(200).send(data);
    })

    .post('/', async (req, res) => {
        const { userId, blogId, comment } = req.body;
        console.log(req.body);
        if (userId && blogId && comment) {
            const newComment = new Comment({
                user: userId,
                blog: blogId,
                comment,
                likes: 0,
            });
            const data = await newComment.save();
            const blog = await Blog.findById(blogId);
            blog.comments = blog.comments.concat(data._id);
            await Blog.findByIdAndUpdate(blogId, blog);
            logger.info(blog);
            res.status(201).send(data);
        } else {
            res.status(400).send({ error: 'userId, blogId and comment must be provided' });
        }
    })

    .get('/:id', async (req, res) => {
        const { id } = req.params;
        const data = await Comment.findById(id);
        res.status(200).send(data);
    });
module.exports = commentRouter;
