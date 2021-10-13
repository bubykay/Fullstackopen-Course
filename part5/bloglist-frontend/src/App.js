import React, { useState, useEffect } from 'react'


import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [notication, setNotification]=useState(null)

  useEffect(() => {
    async function fetchData(){
      try {
        const resource = await blogService.getAll()
        if(resource){
          setBlogs(resource)
        }
      } catch (error) {
        // console.error(error)
      }
    } 
    fetchData()
  }, [user])

  useEffect(()=>{
    const blogUser = window.localStorage.getItem('blogUser')
    if(blogUser){
      const user = JSON.parse(blogUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const response = await loginService.login({username, password})
      blogService.setToken(response.token)
      setUser(response)
      window.localStorage.setItem('blogUser', JSON.stringify(response))
      setPassword('')
      setUsername('')
      setNotification(null)
      
    } catch (error) {
      setNotification({
        type:'error', 
        message:'wrong username or password'
      })
      setTimeout(() => {
        setNotification(null)
      }, 25000);
    }

  }

  const handleCreateBlog = async(event)=> {
    event.preventDefault()
    const data = {author,title,url}
    const response = await blogService.create(data)
    if(response){
      setBlogs(blogs.concat(response))
      setNotification({
        type:'success', 
        message:`a new blog "${response.title}" by ${response.name} added`
      })
      setAuthor('')
      setTitle('')
      setUrl('')
      setTimeout(() => {
        setNotification(null)
      }, 5000);
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('blogUser')
    setUser(null)
  }


  return (
    <div>
      {notication !== null ? (<Notification notification={notication} />):null}
      {
        user === null ? 
        <Login password={password} username={username} setUsername={setUsername}  setPassword={setPassword} handleLogin={handleLogin} />
        :
        (
          <div>
               <h2>blogs</h2>
               <CreateBlog title={title} setTitle={setTitle} url={url} setUrl={setUrl} author={author} setAuthor={setAuthor} onSubmit={handleCreateBlog} />
               <p>{user.name} logged in <button onClick={handleLogout}>log out</button></p>
                  {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                  )}
          </div>
        )
      }
    </div>
  )
}

export default App