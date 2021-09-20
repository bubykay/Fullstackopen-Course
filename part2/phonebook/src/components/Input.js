import React from 'react';

const Input = ({onChange, value, text}) => {
    return (
        <div>
            {text}: <input onChange={onChange} value={value} />
        </div>
    );
};

export default Input;