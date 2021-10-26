import blogService from '../services/blogs';
import { showNotification } from './notificationreducer';
export default (state=[], action) => {
    switch (action.type) {
    case 'POPULATE_BLOGS':
        return action.data;
    case 'CREATE_BLOG':
        return [...state, action.data];
    case 'LIKE_BLOG':
    {
        const blogToLike = state.find(n => n.id===action.data.id);
        return state.map(n => n.id!==blogToLike.id?n:{ ...blogToLike, likes:blogToLike.likes+1 });
    }
    case 'DELETE_BLOG':
    {
        return state.filter(n => n.id !==action.data.id);
    }
    case 'GET_A_Blog':
        return state;
    default:
        return state;
    }
};


export const populateBlogs = () => {
    return async dispatch => {
        const data = await blogService.getAll();
        dispatch({
            type: 'POPULATE_BLOGS',
            data
        });
    };
};

export const createBlog = obj => {
    return async dispatch => {
        const data = await blogService.createABlog(obj);
        dispatch({
            type: 'CREATE_BLOG',
            data
        });
    };
};

export const likeABlog = (obj) => {
    return async dispatch => {
        try {
            const data = await blogService.likeABlog(obj);
            dispatch({ type:'LIKE_BLOG', data });
        } catch (error) {
            dispatch(showNotification(error.toString(), 5));
        }
    };
};

export const deleteABlog = (obj) => {
    return async dispatch => {
        try {
            await  blogService.deleteBlog(obj);
            dispatch({ type:'DELETE_BLOG', data:obj });
        } catch (error) {
            dispatch(showNotification(`error deleting ${obj.title}`));
        }
    };
};

// export const getABlog = (id) => {
//     return async dispatch => {
//         try {
//             const blog = await blogService.getABlog(id);
//             dispatch({ type:'GET_A_Blog', data:blog });
//         } catch (error) {
//             dispatch(showNotification(error.toString()));
//         }
//     };
// };