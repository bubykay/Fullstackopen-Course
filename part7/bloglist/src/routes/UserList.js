import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { populateUsers } from '../reducers/usersReducer';

const UserList = () => {
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    console.log(users);
    useEffect(() => {
        dispatch(populateUsers());
    },[]);

    return (
        <div>
            {users.map(user => (
                <div key={user.id}>
                    <Link key={user.id} to={`user/${user.id}`}>{user.username} {user.blog.length}</Link>
                </div>
            ))}
        </div>
    );
};

export default UserList;