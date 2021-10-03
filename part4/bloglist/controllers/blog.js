const blogRouter = require('express').Router()

const Blog = require('../model/blog')


blogRouter
.get('/info', (req,res)=>{
    res.send('starting another project')
})
.get('/', (req, res) => {
    Blog
      .find({})
      .then(blogs => {
        res.json(blogs)
      })
  })
  
.post('/', (req, res) => {
    const blog = new Blog(req.body)
    blog
      .save()
      .then(result => {
        res.status(201).json(result)
      })
  })


module.exports = blogRouter

