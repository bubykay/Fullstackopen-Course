import React from 'react';
import { useField } from '../hooks';

const CommentForm = () => {
    const comment = useField('text');
    const handleCommentSubmit =(event) => {
        event.preventDefault();
        console.log(comment.value);
    };
    return (
        <div>
            <form onSubmit={handleCommentSubmit}>
                <input value={comment.value} onChange={comment.onChange} type={comment.type}/>
                <button>Comment</button>
            </form>
        </div>
    );
};

export default CommentForm;