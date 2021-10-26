import React from 'react';
import { useSelector } from 'react-redux';
import { useParams , Link } from 'react-router-dom';


const UserDetail = () => {
    const user = useSelector(state => state.users);
    const { id } = useParams();
    const actualUser = user.find(n => n.id===id);
    return (
        <div>
            {actualUser.username}
            <h3>Added Blogs</h3>
            {actualUser.blog.map(blog => (
                <div key={blog.id}>
                    <Link key={blog.id} to={`/blog/${blog.id}`}>{blog.title}</Link>
                </div>
            ))}
        </div>
    );
};

export default UserDetail;