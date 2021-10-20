
export default (state={ id:0, message:null }, action) => {
    switch(action.type){
    case 'SHOW':
        return action.data;
    case 'HIDE':
        return action.data;
    default:
        return state;
    }
};

export const showNotification = (message, id) => {
    return {
        type: 'SHOW',
        data: {
            message,
            id
        }
    };
};

export const hideNotification = (id) => {
    return{
        type:'HIDE',
        data:{
            id,
            message: null
        }
    };
};


let nextNotification = 0;
let timeOutExist;
export const  displayNotification = ( message) => {
    return async dispatch => {
        const id = nextNotification++;
        if(timeOutExist){
            clearTimeout(timeOutExist);
        }
        dispatch(showNotification(message, id));
        timeOutExist = setTimeout(() => {
            dispatch(hideNotification(id));
        }, 5000);

    };

};

