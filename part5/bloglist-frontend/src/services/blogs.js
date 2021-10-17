import axios from 'axios';
const baseURL = '/api/blogs';

let token = null;

const setToken = credential => {
    token = `Bearer ${credential}`;
};

const getAll = async() => {
    if(token){
        try {
            const resource = await axios({
                baseURL,
                method: 'GET',
                headers : { Authorization: token }
            });
            return resource.data;
        } catch (error) {
            console.log(error);
        }
    }
};

const create = async(data) => {
    const response = await axios({
        baseURL,
        method: 'POST',
        data,
        headers: { Authorization: token }
    });
    return response.data;
};

const update = async(data) => {
    const { id } = data;
    const response = await axios({
        method: 'PUT',
        data,
        baseURL: `${baseURL}/${id}`,
        headers: { Authorization: token }
    });

    return response.data;
};

const deleteBlog = async(blogObj) => {
    const { id } = blogObj;
    const response = await axios({
        method: 'DELETE',
        baseURL: `${baseURL}/${id}`,
        headers: { Authorization: token }
    });
    return response;
};



const obj = {
    getAll,
    setToken,
    create,
    update,
    deleteBlog
};
export default  obj;