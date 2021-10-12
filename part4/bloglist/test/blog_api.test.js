const mongoose = require('mongoose')
const superTest = require('supertest')
const app = require('../app')


const Blog = require('../model/blog')
const { initialBlogs } = require('../utils/blog_helpers')
const helper = require('../utils/blog_helpers')


const api = superTest(app)
const resourceUrl = '/api/blogs'
const reqToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidG9zaW5pbWEiLCJpZCI6IjYxNjA3M2VmMGVlODBhNzM4MTMwNGJlMiIsImlhdCI6MTYzMzk1MzI4OSwiZXhwIjoxNjM0MDM5Njg5fQ.DlTDJ_HmvC7zcPJTMZTH2nwhNm3LxTcfF_0v-QSx6uw"


//operation before each test case (start with fresh state)
beforeEach(async()=>{
    await Blog.deleteMany({})
    for(let blog of helper.initialBlogs){
        console.log(blog)
        await api
                .post(resourceUrl)
                .send(blog).set({Authorization: reqToken})
    }
},100000)

describe('View blog operation', ()=>{
    test('total blogs equal to inserted', async ()=>{
        const response = await api
            .get(resourceUrl)
            .set({Authorization: reqToken})
            .expect(200)
            .expect("Content-Type", /application\/json/) 
            
            //compare length of initialBlog with response body
            expect(response.body).toHaveLength(helper.initialBlogs.length)
    }, 100000)
    
    test('the unique identifier of a blog is id', async()=>{
        // const reponse = await h
        const response = await api
                    .get(resourceUrl)
                    .set({Authorization: reqToken})
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
            .set({Authorization: reqToken})
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
                                .set({Authorization: reqToken})
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
            .set({Authorization: reqToken})
            .expect(400)
})
})

describe("delete blog operation", ()=>{
    test('single blog with valid id can be deleted', async ()=>{
        const blogAtStart = await helper.blogsInDB()
        const validID = blogAtStart[0].id
        console.log('id to be deleted', validID)
        await api
                .delete(`${resourceUrl}/${validID}`)
                .set({Authorization: reqToken})
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
                                .set({Authorization: reqToken})
                                .expect(200)
                                .expect("Content-Type", /application\/json/)
        expect(response.body.likes).toBe(newlikes)
        
    })
})


afterAll(()=>{
    mongoose.connection.close()
})