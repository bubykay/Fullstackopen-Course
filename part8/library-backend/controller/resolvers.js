const {AuthenticationError, UserInputError} = require('apollo-server-express')
const jwt = require('jsonwebtoken')
const {PubSub} = require('graphql-subscriptions')

const User = require('../model/users')
const Author = require('../model/authors')
const Book = require('../model/books')
const JWT_SECRET = 'JWT_SECRET'

const pubSub = new PubSub()

module.exports = {
    Subscription: {
    bookAdded: {
      subscribe: () => pubSub.asyncIterator(['BOOK_ADDED'])
    }
  },
  Query: {
    allUsers : async()=>await User.find({}),
    bookCount: ()=>Book.collection.countDocuments(),
    authorCount: ()=>Author.collection.countDocuments(),
    allBooks: async(root, args)=> {
     try {
      const books = await Book.find({}).populate('author')
      if(args.author && args.genre){
        return books.filter(book=>{
          return book.author.toLocaleLowerCase() === args.author.toLocaleLowerCase() && book.genres.map(genre=>genre.toLocaleLowerCase()).includes(args.genre.toLocaleLowerCase())
        })
      }else if(!args.author && !args.genre){
        return books
      }else if(args.author && !args.genre){
         return books.filter(b=>b.author.name.toLocaleLowerCase()===args.author.toLocaleLowerCase())
      }
        return books.filter(book=>book.genres.map(genre=>genre.toLocaleLowerCase()).includes(args.genre.toLocaleLowerCase()))
     } catch (error) {
       console.log(error)
     }
    },

    allAuthors: async()=>  Author.find({}),
    me: (root, args, context)=>{
      // console.log(context.loggecdInUser)
      return context.loggedInUser
    },
    allGenres : async ()=>{
      const allBooks = await Book.find({})
      const genres = []
      allBooks.map(book=>book.genres.map(genre=>genres.push(genre)))
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
      return genres.filter(onlyUnique)
    }
   
  },

  Book: {
    author: (root)=>{
      const {author} = root
      return {
        name: author.name,
        born: author.born
      }
    }
  },

  Author: {
    bookCount: async (root)=>{
      const author =  await Author.findOne({name:root.name})
      const books = await Book.find({author:author._id})
      return books.length
    },
    id: async (root)=>{
      const author =  await Author.findOne({name:root.name})
      return author._id
    }
  },



  Mutation: {
    addBook: async (root, args, context)=>{
      // if(!context.loggedInUser) throw new AuthenticationError('please login')
         try {
          let author = await Author.findOne({name: args.author})
          if(!author){
            const newAuthor = new Author({name:args.author})
            author = await newAuthor.save()
          }
            const newBook = new Book({...args, author})
            const savedBook = await newBook.save()
            pubSub.publish('BOOK_ADDED',{
              bookAdded: savedBook
            })
            return savedBook
         } catch (error) {
           throw new Error(error.message)
         }
    },

    editAuthor: async (root, args, context)=> {
      if(!context.loggedInUser) throw new AuthenticationError('Authorization failure')
      const {name, born} = args
      const authorObj = await Author.findOne({name, born})
      if(!authorObj) throw new UserInputError('author does not exist')
      return authorObj
    },

    login: async(root, args)=>{
      const {username, password} = args
      const user = await User.findOne({username: username})
      if(!user || password!=='password') throw new UserInputError('invalid username', {
        invalidArgs: args})
      return {value: jwt.sign({username: args.username, id:user.id}, JWT_SECRET)}
    },

    createUser: (root, args)=>{
      try {
        const {username, favoriteGenre} = args
        const newUser = new User({username, favoriteGenre})
        return newUser.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args})
      }
    },

    editBorn: (root, args, context) => {
      if(!context.loggedInUser) throw new AuthenticationError('Authorization failure')
        const searchedAuthor = authors.find(author=> author.name===args.name) 
        const editedAuthor = {...searchedAuthor, born:args.setBornTo}
        authors = authors.map(author=>author.id !== searchedAuthor.id ? author : editedAuthor)
        return editedAuthor 
      }
  }
}