import React , { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useField } from './hooks';




const CreateNew = (props) => {

    const histroy = useHistory();
    const content = useField('text');
    const author = useField('text');
    const info = useField('text');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        });
        histroy.push('/');
    };

    const handleReset = (event) => {
        event.preventDefault();
        content.reset();
        info.reset();
        author.reset();
    };

    return (
        <div>
            <h2>Create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    Content: <input {...content.data }/>
                </div>
                <div>
                   Author: <input {...author.data}/>
                </div>

                <div>
                   Info: <input {...info.data}/>
                </div>
                <button>create</button> <button onClick={handleReset}>reset</button>
            </form>
        </div>
    );
};

export default CreateNew;