import React from 'react'
import SearchByGenre from './SearchByGenre'
// import {useLazyQuery} from '@apollo/client'

// import {ALL_BOOKS} from './queries'

const Books = (props) => {
 

  const {books, setBooks, setError, genres} = props

  
  if (!props.show) {
    return null
  }


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
        <SearchByGenre books={books} setBooks={setBooks}  setError={setError} genres={genres}  getData={props.getData}/>
    </div>
  )
}

export default Books