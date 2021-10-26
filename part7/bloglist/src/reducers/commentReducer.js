import { showNotification } from './notificationreducer';

import commentService from '../services/comment';

export default (state=[], action) => {
    switch (action.type) {
    case 'POPULATE_COMMENT':
        return action.data;

    case 'CREATE_COMMNET':
        return state;
    default:
        return state;
    }
};

export const populateComments = () => {
    return async dispatch => {
        try {
            const data = commentService.getALL();
            dispatch({ type:'POPULATE_COMMENT', data });
        } catch (error) {
            dispatch(showNotification('error retriving comments'));
        }
    };
};

export const createABlog = (obj) => {
    const { blogId, userId, comment } = obj;
    return async dispatch => {
        if(blogId && userId && comment){
            try {
                const data = commentService.createAComment();
                dispatch({ tye:'CREATE_BLOG', data });
                dispatch(showNotification('successfully commented'));
            } catch (error) {
                dispatch(showNotification(error.toString()));
            }
        }else{
            dispatch(showNotification('blogId, UserId and comment must be provided'));
        }
    };
};