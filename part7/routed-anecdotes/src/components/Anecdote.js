import React from 'react';
import { useParams } from 'react-router-dom';

const Anecdote = ({ anecdotes }) => {
    const { id } = useParams();
    console.log(typeof id);

    const anecdote = anecdotes.find(n => n.id === id);

    return (
        <div>
            <h3>{anecdote.content}</h3>
            <p>had {anecdote.votes} votes</p>
        </div>
    );
};

export default Anecdote;