const {gql} = require('apollo-server-express')
module.exports = gql`
  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }

  type Subscription {
    bookAdded: Book
  }

  type Token {
    value: String!
  }

  type Query {
    me: User
  }
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }
  
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre:String): [Book!]!
    allAuthors: [Author!]!
    allUsers: [User!]!
    allGenres: [String!]!
  }

  input AuthorInput {
    name: String!
    born: Int 
  }

  type Mutation{
    editAuthor(name: String!, born: Int!):Author!

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token,

    addBook (
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ):Book!,
    editBorn(name:String, setBornTo: Int):Author!
  }
`
