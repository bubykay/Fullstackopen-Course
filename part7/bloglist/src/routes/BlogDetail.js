import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comment from '../components/Comment';
import blogService from '../services/blogs';

const BlogDetail = () => {
    const [blog, setBlog] = useState({});
    const { id } = useParams();

    useEffect(() => {
        async function getAblog(){
            const finalBlog = await blogService.getABlog(id);
            setBlog(finalBlog);
        }
        getAblog();
    },[]);

    if(!blog.user){
        return null;
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <div>www.{blog.url}</div>
            <div>{blog.likes} likes</div>
            <div>added by {blog.user.name}</div>
            <Comment comments={blog.comments} />
        </div>
    );
};

export default BlogDetail;