import axios from 'axios';
// import store from '../store';
// import { useDispatch } from 'react-redux';
// import { logout } from '../reducers/userReducer';


// const dispatch = useDispatch();
const baseURL = '/api/blogs';
let token = null;

const setToken = credential => {
    token = `Bearer ${credential}`;
};

const getAll = async() => {

    const resource = await axios({
        baseURL,
        method: 'GET',
        headers : { Authorization: token }
    });
    // console.log(resource);
    return resource.data;

};

const createABlog = async(data) => {

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

const likeABlog = async(blogObj) => {
    const { id, likes , title, author, url } = blogObj;
    const data = { id, title, author, likes:likes+1, url, user:blogObj.user.id };
    const response = await axios({
        method: 'PUT',
        data,
        baseURL: `${baseURL}/${id}`,
        headers: { Authorization: token }
    });
    return response.data;
};

const getABlog = async(id) => {
    const response = await axios({
        method: 'GET',
        baseURL : `${baseURL}/${id}`
    });
    return response.data;
};



const obj = {
    getAll,
    setToken,
    createABlog,
    update,
    deleteBlog,
    likeABlog,
    getABlog
};
export default  obj;