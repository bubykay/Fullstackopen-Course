import React from 'react';
// import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';

const Comment = ({ comments }) => {
    console.log(comments);
    const commentStyle = {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        border: 'solid',
        borderWidth: 0.5,
        marginBottom: 2.5,
        marginTop: 2.5
    };

    return (
        <div >
            <h3>Add Comment</h3>
            <CommentForm />

            {comments.length?(
                comments.map(comment => <div key={comment.id} style={commentStyle}> {comment.comment} </div>)):(
                <div>No comment at the moment</div>
            )}
        </div>
    );
};

export default Comment;