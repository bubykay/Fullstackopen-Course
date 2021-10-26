import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/loginReducer';
import usersReducer from './reducers/usersReducer';
import  notificationReducer from './reducers/notificationreducer';
import blogReducer from './reducers/blogReducer';
import commentReducer from './reducers/commentReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
    notification: notificationReducer,
    login: loginReducer,
    blogs: blogReducer,
    users: usersReducer,
    comments: commentReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;