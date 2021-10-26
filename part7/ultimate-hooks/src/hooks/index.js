import { useEffect, useState } from 'react';
import axios from 'axios';


export const useField = (type) => {
    const [value, setValue] = useState('');

    const onChange = (event) => {
        setValue(event.target.value);
    };

    return {
        type,
        value,
        onChange
    };
};

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([]);

    const getALl = async() => {
        const result = await axios({
            method: 'GET',
            baseURL:baseUrl
        });
        setResources(result.data);
    };

    useEffect(() => {
        getALl();
    },[baseUrl]);

    const create = async(resource) => {
        const result = await axios({
            method: 'POST',
            baseURL:baseUrl,
            data: resource
        });
        setResources(resources.concat(result.data));
    };

    const service = {
        create
    };

    return [
        resources, service
    ];
};

