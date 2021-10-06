const Blog = require('../model/blog')

const initialBlogs = require('./blogs')


const blogsInDB =  async ()=>{
    const result = await Blog.find({})
    return result.map(result=>result.toJSON())
}

const hasId = async (val) => {
    const response = await Blog({})
    return response[0].id
}

const deleteAll = async () => {
    await Blog.deleteMany({})
  }
  
  const insertMany = async (val) => {
    for(let blog of val){
        const blogToSave = new Blog(blog)
        await blogToSave.save()
    }
  }

  const findById = async (id) => {
      const response = await Blog.findById(id)
      return response.toJSON()
  }

module.exports = {
    blogsInDB,
    hasId,
    initialBlogs,
    insertMany,
    deleteAll
}