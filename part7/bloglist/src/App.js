import React, {  useEffect } from 'react';
import useInterval from '@use-it/interval';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';


// import BlogForm from './components/BlogForm';
import BlogList from './routes/BlogList';
// import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
// import Toggable from './components/Toggable';
import { populateBlogs } from './reducers/blogReducer';
// import { showNotification } from './reducers/notificationreducer';
import { logout ,refreshUser } from './reducers/loginReducer';
import loginService from './services/login';
import blogService from './services/blogs';
import UserList from './routes/UserList';
import NavBar from './routes/NavBar';
import UserDetail from './routes/UserDetail';
import BlogDetail from './routes/BlogDetail';

const App = () => {

    const login = useSelector(state => state.login);
    const dispatch = useDispatch();


    const refreshLogin = async() => {
        const blogUser = JSON.parse(localStorage.getItem('blogUser'));
        if(blogUser){
            const data = await loginService.refreshToken(blogUser);
            if(data.status===401){
                dispatch(logout());
            }
            dispatch(refreshUser(data));
            localStorage.setItem('blogUser', JSON.stringify(data));
            blogService.setToken(data.token);
        }
    };

    useEffect(() => {
        refreshLogin();
    },[]);


    useEffect(() => {
        dispatch(populateBlogs());
    },[]);

    useInterval(async() => {
        const blogUser = JSON.parse(localStorage.getItem('blogUser'));
        // refresh token only if user is still logged in
        if(login){
            try {
                const refreshed = await loginService.refreshToken(blogUser);
                if(refreshed.statu===401){
                    dispatch({ type:'LOGOUT' });
                    localStorage.removeItem('blogUser');
                    return;
                }
                dispatch({ type:'LOGIN', data:refreshed });
                localStorage.setItem('blogUser', JSON.stringify(refreshed));
                blogService.setToken(refreshed.token);
                console.log('login refresed');
            } catch (error) {
                dispatch({ type:'LOGOUT' });
                localStorage.removeItem('blogUser');
            }
        }
    }, 7000000);






    return (
        <Container style={{ marginTop:60 }}>
            <Router>
                <NavBar />
                <Notification />
                <Switch>
                    <Route exact path='/users' component={UserList} />
                    <Route exact path='/user/:id' component={UserDetail} />
                    <Route exact path='/blog/:id' component={BlogDetail} />
                    <Route exact path='/login' component={LoginForm} />
                    <Route exact path='/' component={BlogList} />
                </Switch>
            </Router>
        </Container>
    );
};

export default App;