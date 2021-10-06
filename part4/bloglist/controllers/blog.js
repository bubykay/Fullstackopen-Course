const blogRouter = require('express').Router();

const Blog = require('../model/blog');
const logger = require('../utils/logger');

blogRouter
  .get('/info', async(req, res, next) => {
   try {
    const blogs = await Blog.find({})
    res.send(`blog has total of ${blogs.length} posts`);
   } catch (error) {
     next(error)
   }
  })
  .get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs);
  })

  .post('/', async(req, res, next) => {
    const likes = req.body.likes || 0
    const blog = new Blog({...req.body, likes});
    if(req.body.title && req.body.url){
      try {
        const result = await blog.save()
      res.status(201).json(result);
      } catch (error) {
        next(error)
      }
    }else{
      res.status(400).end()
    }
   
  })

  .delete('/:id', async(req, res, next)=>{
    const id = req.params.id
    if(id){
      try {
        await Blog.findOneAndDelete({_id:id})
        res.status(200).send({message: `blog with id ${id} successfully deleted`})
      } catch (error) {
        next(error)
      }
    }else{
      res.status(400).send({success: 0, message: "Id required"})
    }
  })
  .put('/:id', async(req, res, next)=>{
    // logger.info("Id is:" ,req.params.id)
    const {body} = req
    if(body.likes){
      try {
        // const result = await Blog.findById(req.params.id)
        const serverRes = await Blog.findByIdAndUpdate(req.params.id, {likes:body.likes}, {new:true})
        res.status(200).send(serverRes)
      } catch (error) {
        next(error)
      }
    }else{
      res.status(400).send('likes is required')
    }
  })

module.exports = blogRouter
