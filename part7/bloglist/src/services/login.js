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

const refreshToken = async(data) => {
    const response = await axios({
        baseURL: `${baseURL}/refresh`,
        method: 'POST',
        data
    });
    if(response.status===401){
        console.log('there is auth error');
        return response;
    }
    // console.log(response);
    return response.data;
};
const services = {

    refreshToken,
    login
};

export default services;