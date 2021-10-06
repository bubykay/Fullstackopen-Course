const listHelper = require('../utils/list_helpers')
const copiedBlog = require('./blogs')
const logger = require('../utils/logger')


    test('dumy return 1', ()=>{
        const blogs = []
        expect(listHelper.dumy(blogs)).toBe(1)
    })

    describe('total likes', ()=>{
        test('of empty list is zero', ()=>{
            const blogs = []
            expect(listHelper.totalLikes(blogs)).toBe(0)

        }) 
        test('when list has only one blog equals the likes of that', ()=>{
            const blogs = [{likes:50}]
            expect(listHelper.totalLikes(blogs)).toBe(50)

        }) 
        test('of a bigger list is calculated right', ()=>{
            const blogs = [{likes:50},{likes:10},{likes:20},{likes:500},{likes:501}]
            expect(listHelper.totalLikes(blogs)).toBe(1081)

        }) 
    })

    describe('favorite blog', ()=>{
        test('of a list with highest likes', ()=>{
            const favorite = {
                _id: "5a422b3a1b54a676234d17f9",
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                likes: 12,
                __v: 0
              }
            expect(listHelper.favouriteBlog(copiedBlog)).toEqual(favorite)
        })
    })

