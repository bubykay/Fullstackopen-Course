const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');

const Blog = require('../model/blog');
const User = require('../model/user');

blogRouter
    .get('/info', async (req, res) => {
        const blogs = await Blog.find({});
        res.send(`blog has total of ${blogs.length} posts`);
    })
    .get('/:id', async (req, res) => {
        const { id } = req.params;
        const response = await Blog.findById(id).populate('user', { username: 1, name: 1 }).populate('comments');
        res.status(200).send(response);
    })
    .get('/', async (req, res) => {
        // console.log(res.loginValid);
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
        res.json(blogs);
    })
    .post('/', async (req, res) => {
        const likes = req.body.likes || 0;
        // userId to identity creator of blog should be included in the request object
        const { title, url, author } = req.body;

        if (title && url) {
            // const token = getToken(req)
            const { token } = req;
            const decodedToken = jwt.verify(token, process.env.SECRETE);
            if (!token || !decodedToken.id) {
                return res.status(401).send('invalid/missing token');
            }
            const { id } = decodedToken;
            const user = await User.findById(id);
            // const user =  await getRandomUser()
            const blog = new Blog({
                title, url, likes, author, user: user._id,
            });
            const result = await blog.save();
            user.blog = user.blog.concat(result._id);
            await User.findByIdAndUpdate(id, user);
            // await user.save()
            res.status(201).json(result);
        } else {
            res.status(400).end();
        }
    })
    .delete('/:id', async (req, res) => {
        const { id } = req.params;
        if (id) {
            const blogToDelete = await Blog.findById(id).populate('comments', { comment: 1 });
            if (!blogToDelete) {
                return res
                    .status(400)
                    .send({ error: `blog with ${id} cannot be found` });
            }
            if (req.user?.id !== await blogToDelete?.user.toString()) {
                return res.status(401).send({ error: 'authorization error' });
            }
            await Blog.findOneAndDelete({ _id: id });
            res.status(200).send({ message: `blog with id ${id} successfully deleted` });
        } else {
            return res
                .status(400)
                .send({ success: 0, message: 'Id required' });
        }
    })
    .put('/:id', async (req, res) => {
        if (!req.user) {
            return res.status(401).send('login required');
        }
        const {
            likes, url, title, author, user,
        } = req.body;
        // console.log(req.body);
        if (likes && url && title && author && user) {
            // const result = await Blog.findById(req.params.id)
            const serverRes = await Blog
                .findByIdAndUpdate(
                    req.params.id,
                    {
                        likes, url, title, author, user,
                    }, { new: true },
                );
            res.status(200).send(serverRes);
        } else {
            res
                .status(400)
                .send('likes, url, title, author and/or user can not be empty');
        }
    });
module.exports = blogRouter;
