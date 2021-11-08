
import React, {useState, useEffect } from 'react'
import { useLazyQuery, useApolloClient, useSubscription} from '@apollo/client'



import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import {ALL_QUERIES, BOOK_ADDED, ME} from './components/queries'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import Recommendation from './components/Recommendation'




const App = () => {
  const [page, setPage] = useState('authors')
  const [books, setBooks] = useState([])
  const [authors, setAuthors] = useState([])
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const [genres, setGenres] = useState([])
  const [user, setUser] = useState(null)

  const [getData,{data, loading}] = useLazyQuery(ALL_QUERIES)
  const [getMe, my] = useLazyQuery(ME)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({subscriptionData})=>{
      console.log(subscriptionData)
    }
  })
  


  const client = useApolloClient()

  const getToken = () => {
    const localToken = localStorage.getItem('graphQlToken')
    if(localToken){
      setToken(localToken)
    }
  }

const handleLogout = () => {
  setToken(null)
  setUser(null)
  localStorage.clear()
  client.resetStore()

}



  
useEffect(()=>{
 getData()

 if(data){
   setAuthors(data.allAuthors)
   setBooks(data.allBooks)
   setGenres(data.allGenres)
 }
 
},[data, getData])


useEffect(()=>{
  if(token){
    getMe()
    if(my.data){
      setUser(my.data.me)
    }
  }
},[token, getMe, my.data])






useEffect(()=>{
  getToken()
 },[])



  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token?<button onClick={() => setPage('recommendation')}>recommendation</button>:null}
        {token?
        <button onClick={() => setPage('add')}>add book</button>
        :<button onClick={() => setPage('login')}>login</button>}
        {token?<button onClick={handleLogout}>logout</button>:null}
      </div>
      <Notify message={error} />

      {
      !loading?

      (
       <div>
         <Authors
        show={page === 'authors'} 
        authors = {authors}
      />

      <Books
        show={page === 'books'} 
        books ={books}
        setError={setError}
        setBooks={setBooks}
        genres={genres}
        getData={getData}
      />

      <Recommendation user={user} show={page === 'recommendation'} />

      
      {!token?<LoginForm 
        show={page==='login'} 
        setToken={setToken} 
        setError={setError}
        setPage={setPage}
      />:<NewBook
      show={page === 'add'}
      setBooks = {setBooks}
      books = {books}
      setError= {setError}
    />}
    
       </div>
          
      ):(
        <div>
          <p>Data loading pls wait...</p>
          </div>
      )
    }
      
<LoginForm />
    </div>
  )
}

export default App