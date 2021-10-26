import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route , useHistory } from 'react-router-dom';

import Menu from './components/Menu';
import AnecdoteList from './components/AnecdoteList';
import Footer from './components/Footer';
import About from './components/About';
import Anecdote from './components/Anecdote';
import CreateNew from './components/CreateNew';
import Notification from './components/Notification';








const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: '1'
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: '2'
        }
    ]);

    const [notification, setNotification] = useState(null);


    const addNew = (anecdote) => {
        anecdote.id = (Math.random() * 10000).toFixed(0);
        setAnecdotes(anecdotes.concat(anecdote));
        setNotification(`${anecdote.content} created`);
        setTimeout(() => {
            setNotification(null);
        }, 10000);

    };

    const anecdoteById = (id) =>
        anecdotes.find(a => a.id === id);

    const vote = (id) => {
        const anecdote = anecdoteById(id);

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        };

        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a));
    };

    return (
        <div>
            <Router>
                <h1>Software anecdotes</h1>
                <Menu />
                {notification? <Notification notification={notification} />:null}
                <Switch>

                    <Route path='/create'>
                        <CreateNew exact addNew={addNew} />
                    </Route>
                    <Route exact path='/about'>
                        <About />
                    </Route>
                    <Route exact path='/anecdotes/:id'>
                        <Anecdote anecdotes={anecdotes} />
                    </Route>
                    <Route exact path='/'>
                        <AnecdoteList anecdotes={anecdotes} />
                    </Route>
                </Switch>
            </Router>
            <Footer />
        </div>
    );
};

export default App;