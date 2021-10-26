import React from 'react';

const Button = ({ type, label }) => {
    return (
        <div>
            <button type={type} id={label}>{label}</button>
        </div>
    );
};

export default Button;