
// eslint-disable-next-line

import loginService from '../services/login';
import blogService from '../services/blogs';
import { showNotification } from './notificationreducer';
// import useInterval from '@use-it/interval';


export default  (state=null, action) => {
    switch (action.type) {
    case 'LOGIN':
        return action.data;
    case 'LOGOUT':
        return null;
    default:
        return state;
    }
};


export const login = (obj) => {
    return async dispatch => {
        const data = await loginService.login(obj);
        localStorage.setItem('blogUser', JSON.stringify(data));
        blogService.setToken(data.token);
        dispatch({
            type:'LOGIN',
            data
        });
        dispatch(showNotification('login successful'));
    };
};

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('blogUser');
        dispatch({
            type:'LOGOUT'
        });
        dispatch(showNotification('Successfully logged out'));
    };
};

export const refreshUser =(data) => {
    return dispatch => {
        dispatch({
            type:'LOGIN',
            data
        });
    };
};
