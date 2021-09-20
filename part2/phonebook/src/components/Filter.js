import React from 'react';


import Input from './Input';

const Filter = ({onChange, value, text}) => {
    return (
        <>
            <Input onChange={onChange} value={value} text={text} />
        </>
    );
};

export default Filter;