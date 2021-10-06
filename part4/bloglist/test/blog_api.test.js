const mongoose = require('mongoose')
const superTest = require('supertest')
const app = require('../app')


const Blog = require('../model/blog')
const { initialBlogs } = require('./blog_helpers')
const helper = require('./blog_helpers')


const api = superTest(app)
const resourceUrl = '/api/blogs'



//operation before each test case (start with fresh state)
beforeEach(async()=>{
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
},100000)

describe('View blog operation', ()=>{
    test('total blogs equal to inserted', async ()=>{
        const response = await api
            .get(resourceUrl)
            .expect(200)
            .expect("Content-Type", /application\/json/) 
            
            //compare length of initialBlog with response body
            expect(response.body).toHaveLength(helper.initialBlogs.length)
    }, 100000)
    
    test('the unique identifier of a blog is id', async()=>{
        // const reponse = await h
        const response = await api
                    .get(resourceUrl)
                    .expect(200)
                    .expect("Content-Type", /application\/json/)
                    // console.log(response)
                    expect(response.body[0].id).toBeDefined()
    })
})


describe('insert blog operation', ()=>{
    
test('a valid blog is added to the db', async ()=>{
    const newBody = {
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
        }
    await api
            .post(resourceUrl)
            .send(newBody)
            .expect(201)
            .expect("Content-Type", /application\/json/)

    blogAtEnd = await helper.blogsInDB()

    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogAtEnd.map(blog=>blog.title)).toContain(newBody.title)
        
})

test('likes default to 0 if not present in request body', async ()=>{
    const newBody = {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      }

        const response = await api
                                .post(resourceUrl)
                                .send(newBody)
                                .expect(201)
                                .expect("Content-Type", /application\/json/)
        expect(response.body.likes).toBe(0)
    
})

test('if title or url properties is missing 400 is returned', async ()=>{
    const newBody = {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
      }

    await api
            .post(resourceUrl)
            .send(newBody)
            .expect(400)
})
})

describe("delete blog operation", ()=>{
    test('single blog with valid id can be deleted', async ()=>{
        const blogAtStart = await helper.blogsInDB()
        const validID = blogAtStart[0].id
        await api
                .delete(`${resourceUrl}/${validID}`)
                .expect(200)
        const blogAtEnd = await helper.blogsInDB()
        expect(blogAtEnd.length).toBe(blogAtStart.length -1)
    })
})

describe("update blog operation", ()=>{
    test('likes can be updated', async()=>{
        const updateObj = await helper.blogsInDB()
        const newlikes = updateObj[0].likes + 1
        const response = await api
                                .put(`${resourceUrl}/${updateObj[0].id}`)
                                .send({...updateObj, likes:newlikes})
                                .expect(200)
                                .expect("Content-Type", /application\/json/)
        expect(response.body.likes).toBe(newlikes)
        
    })
})


afterAll(()=>{
    mongoose.connection.close()
})