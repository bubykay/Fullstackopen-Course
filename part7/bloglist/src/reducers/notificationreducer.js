export default (state=null, action) => {
    switch (action.type) {
    case 'SHOW_NOTIFICATION':
        return action.message;
    case 'HIDE_NOTIFICATION':
        return action.message;
    default:
        return state;
    }
};

export const showNotification = (message, time) => {
    let delay = time || 10;

    return dispatch => {
        dispatch({
            type: 'SHOW_NOTIFICATION',
            message
        });
        setTimeout(() => {
            dispatch({
                type: 'HIDE_NOTIFICATION',
                message: null
            });
        }, 1000*delay);
    };
};