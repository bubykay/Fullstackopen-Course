const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken')

const Blog = require('../model/blog');
const User = require('../model/user');
const logger = require('../utils/logger');


blogRouter
  .get('/info', async(req, res, next) => {
    const blogs = await Blog.find({})
    res.send(`blog has total of ${blogs.length} posts`);
  })
  .get('/:id', async (req, res)=>{
    const {id} = req.params
    const response = await Blog.findById(id)
    res.status(200).send(response)
  })
  .get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name:1})
    res.json(blogs);
  })
  .post('/', async(req, res, next) => {
    const likes = req.body.likes || 0
    //userId to identity creator of blog should be included in the request object
    const {title, url, author} = req.body
   
    if(title && url){
        // const token = getToken(req)
        const token = req.token
        const decodedToken = jwt.verify(token, process.env.SECRETE)
        if(!token || !decodedToken.id){
          return res.status(401).send('invalid/missing token')
        }
        const id = decodedToken.id
        const user = await User.findById(id)
        // const user =  await getRandomUser()
        const blog = new Blog({title, url, likes, author, user:user._id});
        const result = await blog.save()
        user.blog = user.blog.concat(result._id)
        await User.findByIdAndUpdate(id, user)
        // await user.save()
      res.status(201).json(result);
    }else{
      res.status(400).end()
    }
   
  })

  .delete('/:id', async(req, res, next)=>{
    const id = req.params.id
    if(id){
        const blogToDelete = await Blog.findById(id)
        if(!blogToDelete){
          return res.status(400).send({error: `blog with ${id} cannot be found`})
        }
        if(req.user?.id !== await blogToDelete?.user.toString()){
          return res.status(401).send({error: 'authorization error'})
        }
        await Blog.findOneAndDelete({_id:id})
        res.status(200).send({message: `blog with id ${id} successfully deleted`})
    }else{
      res.status(400).send({success: 0, message: "Id required"})
    }
  })
  .put('/:id', async(req, res, next)=>{
    
    const {body} = req
    if(body.likes){
        // const result = await Blog.findById(req.params.id)
        const serverRes = await Blog.findByIdAndUpdate(req.params.id, {likes:body.likes}, {new:true})
        res.status(200).send(serverRes)
    }else{
      res.status(400).send('likes is required')
    }
  })

module.exports = blogRouter
