import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { displayNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if(state.filter){
            const filterBy = state.filter;
            return state.anecdotes.filter(anec => anec.content.toLowerCase().includes(filterBy.toLowerCase()));
        }
        return state.anecdotes;
    });
    const dispatch = useDispatch();

    const vote = (anecdote) => {
        const { content } = anecdote;
        dispatch(voteAnecdote(anecdote));
        dispatch(displayNotification(`${content} successfully voted for`));
    };


    return (
        <div>
            {anecdotes.sort((a,b) => b.votes-a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                      has {anecdote.votes} <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnecdoteList;