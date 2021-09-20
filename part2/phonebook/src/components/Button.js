import React from 'react';

const Button = ({text, type}) => {
    return (
        <div>
            <button type={type}>{text}</button>
        </div>
    );
};

export default Button;