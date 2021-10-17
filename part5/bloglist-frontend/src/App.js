import React, { useState, useEffect, useRef } from 'react';


import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Toggable from './components/Toggable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [notication, setNotification]=useState(null);

    const blogFormRef = useRef();

    useEffect(() => {
        async function fetchData(){
            try {
                const resource = await blogService.getAll();
                if(resource){
                    setBlogs(resource);
                }
            } catch (error) {
                console.error('error');
            }
        }
        fetchData();
    }, [user]);

    useEffect(() => {
        const blogUser = window.localStorage.getItem('blogUser');
        if(blogUser){
            const user = JSON.parse(blogUser);
            setUser(user);
            blogService.setToken(user.token);
        }
    },[]);

    const handleLogin = async(event) => {
        event.preventDefault();
        try {
            const response = await loginService.login({ username, password });
            blogService.setToken(response.token);
            setUser(response);
            window.localStorage.setItem('blogUser', JSON.stringify(response));
            setPassword('');
            setUsername('');
            setNotification(null);

        } catch (error) {
            setNotification({
                type:'error',
                message:'wrong username or password'
            });
            setTimeout(() => {
                setNotification(null);
            }, 25000);
        }

    };

    const handleCreateBlog = async(blogObject) => {
        blogFormRef.current.toggleVisibility();
        const response = await blogService.create(blogObject);
        if(response){
            setBlogs(blogs.concat(response));
            setNotification({
                type:'success',
                message:`a new blog "${response.title}" by ${response.name} added`
            });

            setTimeout(() => {
                setNotification(null);
            }, 5000);
        }
    };

    const handleLogout = (event) => {
        event.preventDefault();
        window.localStorage.removeItem('blogUser');
        setUser(null);
    };


    const handleUpdateBlog = async (blogObject) => {
        const response = await blogService.update(blogObject);
        const newBlog = blogs.filter(blog => blog.id!==blogObject.id);
        const blogUser = blogs.find(blog => blog.user.id===blogObject.user);
        if(response){
            response.user = blogUser.user;
            setBlogs(newBlog.concat(response));
        }
    };

    const handleDeleteBlog = async (blogObj) => {
        const response = await blogService.deleteBlog(blogObj);
        if(response.status === 200){
            setBlogs(blogs.filter(blog => blog.id !== blogObj.id));
            setNotification({ type:'success', message:'successfully deleted' });
            setTimeout(() => {
                setNotification(null);
            }, 5000);
        }
    };


    return (
        <div>
            {notication !== null ? (<Notification notification={notication} />):null}
            {
                user === null ?
                    <Toggable buttonLabel='Log in'>
                        <LoginForm
                            password={password}
                            username={username}
                            setUsername={setUsername}
                            setPassword={setPassword}
                            handleLogin={handleLogin}
                            handleUsernameChange={({ target }) => setUsername(target.value)}
                            handlePasswordChange={({ target }) => setPassword(target.value)}
                        />
                    </Toggable>
                    :
                    (
                        <div>
                            <h2>blogs</h2>
                            <p>{user.name} logged in <button onClick={handleLogout} id='logoutButton'>log out</button></p>
                            <Toggable  buttonLabel='Create new blog' ref={blogFormRef}>
                                <BlogForm createBlog ={handleCreateBlog} />
                            </Toggable>
                            {blogs
                                .sort((a,b) => b.likes-a.likes)
                                .map(blog =>
                                    <Blog
                                        key={blog.id}
                                        blog={blog}
                                        update={handleUpdateBlog}
                                        user={user}
                                        deleteBlog={handleDeleteBlog}
                                    />
                                )}
                        </div>
                    )
            }
        </div>
    );
};

export default App;