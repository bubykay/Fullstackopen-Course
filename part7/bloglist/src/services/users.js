import axios from 'axios';
const baseURL = '/api/users';

const getAll = async() => {
    const response = await axios({
        method:'GET',
        baseURL
    });
    return response.data;
};

const Allservices = {
    getAll
};

export default  Allservices;