import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Blog from '../components/Blog';
import Toggable from '../components/Toggable';
import BlogForm from '../components/BlogForm';
import { showNotification } from '../reducers/notificationreducer';
import { createBlog } from '../reducers/blogReducer';

const BlogList = ( ) => {

    const login = useSelector(state => state.login);
    const blogs = useSelector(state => state.blogs);
    const dispatch = useDispatch();

    const blogFormRef = useRef();

    const handleCreateBlog = async(blogObject) => {
        blogFormRef.current.toggleVisibility();
        dispatch(createBlog(blogObject));
        dispatch(showNotification(`${blogObject.title} created`));
    };

    return (
        <div>
            <h2>Blogs</h2>
            {login?(
                <Toggable  buttonLabel='Create new blog' ref={blogFormRef}>
                    <BlogForm createBlog ={handleCreateBlog} />
                </Toggable>
            ):null}
            {blogs
                .sort((a,b) => b.likes-a.likes)
                .map(blog =>
                    <Blog
                        key={blog.id}
                        blog={blog}
                        user={login}
                    />
                )}
        </div>
    );
};

export default BlogList;