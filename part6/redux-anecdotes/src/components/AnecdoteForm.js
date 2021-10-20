import React from 'react';
import { connect } from 'react-redux';


import { createAnecdote } from '../reducers/anecdoteReducer';
import { displayNotification } from '../reducers/notificationReducer';


const AnecdoteForm = (props) => {

    const handleCreateNew = (event) => {
        event.preventDefault();
        const content = event.target.createNew.value;
        props.createAnecdote(content);
        props.displayNotification(`you've successfully created ${content} anecdote`);
        event.target.createNew.value = '';

    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleCreateNew}>
                <div><input type='text' name='createNew' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    );
};
const mapDispatchToState = {
    createAnecdote,
    displayNotification
};
export default connect(null, mapDispatchToState)(AnecdoteForm);