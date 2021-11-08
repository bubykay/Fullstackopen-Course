import axios from 'axios';
const baseURL = '/api/comments';

const getALL = async() => {
    const response = await axios({
        method: 'GET',
        baseURL
    });
    return response.data;
};

const createAComment = async ({ blogId, userId, comment }) => {
    if(blogId && userId && comment){
        const response = axios({
            method: 'POST',
            baseURL,
            data: { blogId, userId, comment }
        });
        return (await response).data;
    }
};

const allServices = {
    getALL,
    createAComment
};

export default allServices;
