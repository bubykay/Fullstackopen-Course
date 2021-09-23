import React from 'react';

const DisplayManyCountries = ({countries, handleOnClick}) => {

    return (
        <>
            {countries.map((country, index)=>(
                <div key={index}>{country.name} <button onClick={()=>handleOnClick(country)} value={country.name} >show</button></div>
            ))}
        </>
    );
};

export default DisplayManyCountries;