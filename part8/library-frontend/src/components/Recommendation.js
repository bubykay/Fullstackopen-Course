import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import {SEARCH_BY_GENRE} from './queries'

const Recommendation = (props) => {
  const [favBooks, setFavBooks] = useState([])
  const [getBYGenre, {data}] = useLazyQuery(SEARCH_BY_GENRE)
  const {user} = props


  useEffect(()=>{
    if(user){
      getBYGenre({variables:{genre: user.favoriteGenre}})
      if(data){
        setFavBooks(data.allBooks)
      }
    }
  },[data, getBYGenre, user])


  if (!props.show) {
    return null
  }

  if(user){
  return (
    <div>
      books in your favorite genre {user.favoriteGenre}
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
          {favBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div> 
  );
  }
  return(
    <div>No fav genre</div>
  )
};


export default Recommendation