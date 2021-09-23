import React from 'react';

const FindCountry = ({value, onChange}) => {
    return (
        <div>
            Find country <input value={value} onChange={onChange} />
        </div>
    );
};

export default FindCountry;