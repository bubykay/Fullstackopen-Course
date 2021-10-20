// import anecdote from '../services/anecdote';
import anecdoteService from '../services/anecdote';

export default (state=[], action) => {

    switch(action.type){
    case 'VOTE':
    {
        const { id } = action.data;
        const toVote = state.find(note => note.id === id);
        const newVote = { ...toVote, votes: toVote.votes + 1 };
        return  state.map(note => note.id !== id ? note : newVote );
    }
    case 'CREATE':
    {
        const { data } = action;
        console.log(data);
        return state.concat(data);
    }
    case 'POPULATE':
        return action.data;
    default:
        return state;
    }
};

export const voteReducer =(id) => {
    return {
        type: 'VOTE',
        data: { id }
    };
};

export const createAnecdoteReducer =(content) => {
    return {
        type: 'CREATE',
        data: content
    };
};

export const populateAnecdoteReducer = data => {

    return {
        type: 'POPULATE',
        data
    };
};

export const createAnecdote = (content) => {
    return async dispatch => {
        const data = await anecdoteService.creatAnecdote(content);
        dispatch({
            type : 'CREATE',
            data
        });
    };
};
export const initializeAnecdotes = () => {
    return async dispatch => {
        const data = await anecdoteService.getAll();
        dispatch({
            type: 'POPULATE',
            data
        });
    };
};

export const voteAnecdote = (anecdote) => {
    return async dispatch => {
        const data = await anecdoteService.voteAnecdote(anecdote);
        dispatch({
            type: 'VOTE',
            data
        });
    };
};
