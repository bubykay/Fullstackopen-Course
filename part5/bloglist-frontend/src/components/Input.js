import React from 'react';

const Input = ({ type, name, value, onChange }) => {
    return (
        <div>
            {name}: <input
                type={type}
                name={name}
                value={value}
                id={name}
                onChange={onChange}
            />
        </div>
    );
};

export default Input;