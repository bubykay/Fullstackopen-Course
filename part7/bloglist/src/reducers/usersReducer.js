import usersService from '../services/users';
export default (state=[], action) => {
    switch (action.type) {
    case 'POPULATE':
        return action.data;

    default:
        return state;
    }
};


export const populateUsers = () => {
    return async dispatch => {
        const data = await usersService.getAll();
        dispatch({ type:'POPULATE', data });
    };

};