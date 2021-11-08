import {gql} from '@apollo/client'
const BOOK_DETAILS = gql`
fragment bookDetails on Book {
  title
    id
    published
    genres
    author {
      bookCount
      name
      id
    }
}
`
export const BOOK_ADDED = gql`
subscription bookAdded{
  title
  id
  published
  genres
  author {
    bookCount
    name
    id
  }
}

`
export const ADD_BOOK = gql`mutation addBook($title: String!, $published: Int!, $author: String!,  $genres: [String]){
  addBook(title: $title, published: $published, author: $author, genres: $genres){
    title
    published
    genres
    id
    author {
      bookCount
      name
      id
    }
  }
}
`
export const LOGIN = gql`mutation login($username: String!, $password: String!)
  {
    login(username: $username, password: $password){
      value
    }
  }
  `
  export const SEARCH_BY_GENRE = gql`query getByGenre($genre: String!)
  {
    allBooks(genre:$genre){
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
  `

export const ALL_QUERIES = gql`
{
  allAuthors {
        name
        born
        bookCount
       id
    },

    allGenres,

  allBooks {
    ...bookDetails
  }
}
${BOOK_DETAILS}
`
export const ME = gql`
{
  me{
    username
    favoriteGenre
  }
}`


