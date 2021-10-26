import React from 'react';
// import {  useDispatch, useSelector } from 'react-redux';
// import { deleteABlog, likeABlog } from '../reducers/blogReducer';
import { Link } from 'react-router-dom';


const Blog = ({ blog }) => {

    // const [visible, setVisible]= useState(false);

    // const dispatch = useDispatch();
    // const login = useSelector(state => state.login);

    // const showWhenVisible = { display: visible ? '' : 'none' };

    const blogStyle = {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };

    // const handleIncreaseLike = (event) => {
    //     event.preventDefault();
    //     dispatch(likeABlog({ ...blog, votes:blog.votes+1 }));
    // };

    // const handleDeleteBlog = (event) => {
    //     event.preventDefault();
    //     const response = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    //     if(response){
    //         dispatch(deleteABlog(blog));
    //     }
    // };

    return (
        <div style={blogStyle}>
            <div>
                <Link key={blog.id} to={`blog/${blog.id}`}>
                    {blog.title}, {blog.author}
                </Link>
                {/* <button
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
                {login?
                    <div>{blog.user.username===login.username?<button onClick={handleDeleteBlog} className='deleteBlog'>Delete</button>:null}</div> : null
                } */}
            </div>
        </div>
    );
};


export default Blog;