import React from 'react';
import {useLazyQuery} from '@apollo/client'
import { SEARCH_BY_GENRE, ALL_QUERIES} from './queries';

const SearchByGenre = ({setBooks, setError, genres}) => {
  const [getByGenre, {data}] = useLazyQuery(SEARCH_BY_GENRE, {
    onError: error=>{
      setError(error.graphQLErrors[0].message)
    }
  })

  const [getAll, allResult] = useLazyQuery(ALL_QUERIES)

 
  const handleGenreSearch = (genre) => {
   getByGenre({variables:{genre}})
    if(data){
      setBooks(data.allBooks)
    }
  }

 const handleGetALL = () => {
  getAll()
   if(allResult.data){
     setBooks(allResult.data.allBooks)
   }
 }


  return (
    <div>
      {genres.map(genre=>(<button onClick={()=>handleGenreSearch(genre)} key={genre}>{genre}</button>))}
      <button onClick={handleGetALL}>all genres</button>
    </div>
  );
};

export default SearchByGenre;