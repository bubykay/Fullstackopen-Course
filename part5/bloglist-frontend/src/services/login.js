import axios from 'axios';


const baseURL = '/api/login';


const login = async credential => {
    // console.log(credential)
    const resource = await axios({
        baseURL,
        method: 'POST',
        data: credential
    });
    return resource.data;
};
const services = {

    login
};

export default services;