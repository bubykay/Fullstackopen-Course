import axios from 'axios';


const baseURL = 'http://localhost:3001/anecdotes';

export const getAll = async() => {
    const response = await axios({
        baseURL,
        method: 'GET'
    });
    return response.data;
};


export const creatAnecdote = async (content) => {
    const getId = () => (100000 * Math.random()).toFixed(0);
    const data= {
        content,
        id: getId(),
        votes: 0
    };
    const response = await axios({
        method: 'POST',
        baseURL,
        data
    });
    return response.data;
};

export const voteAnecdote = async (anecdote) => {
    const { id, votes } = anecdote;
    const response = await axios({
        method: 'PUT',
        baseURL: `${baseURL}/${id}`,
        data: { ...anecdote, votes: votes+1 }
    });
    return response.data;

};

export default  {
    creatAnecdote,
    getAll,
    voteAnecdote
};

