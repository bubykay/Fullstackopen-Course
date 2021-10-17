import React, { useState } from 'react';


const Blog = ({ blog, update, user, deleteBlog }) => {

    const [visible, setVisible]= useState(false);

    const showWhenVisible = { display: visible ? '' : 'none' };

    const blogStyle = {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };

    const handleIncreaseLike = (event) => {
        event.preventDefault();
        const blogObject = {
            url: blog.url,
            author: blog.author,
            user: blog.user.id,
            title: blog.title,
            likes: blog.likes + 1,
            id: blog.id
        };
        update(blogObject);
    };

    const handleDeleteBlog = (event) => {
        event.preventDefault();
        const response = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
        if(response){
            deleteBlog(blog);
        }
    };


    return (
        <div style={blogStyle}>
            <div>
                {blog.title}, {blog.author}
                <button
                    onClick={() => setVisible(!visible)}
                    className='detailToggle'
                >
                    {visible?'hide':'view'}
                </button>
            </div>
            <div style={showWhenVisible} className='blogDetail'>
                <div>{blog.url}</div>
                <div>Likes: {blog.likes} <button onClick={handleIncreaseLike} className={`${blog.title} like`}>like</button></div>
                <div>{blog.user.name}</div>
                <div>{blog.user.username===user.username?<button onClick={handleDeleteBlog} className='deleteBlog'>Delete</button>:null}</div>
            </div>
        </div>
    );
};


export default Blog;