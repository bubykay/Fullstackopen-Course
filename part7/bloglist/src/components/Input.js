import React from 'react';
import { useField } from '../hooks';

const Input = ({ type, name }) => {
    const title = useField(type);
    return (
        <div>
            {name}: <input
                type={title.type}
                name={title.value}
                value={title.value}
                id={title.value}
                onChange={title.onChange}
            />
        </div>
    );
};

export default Input;