import React from 'react';

import DisplayManyCountries from './DisplayManyCountries'
import DisplayOneCountry from './DisplayOneCountry'

const Display = ({countries, handleOnclick, countryWeather}) => {
    const toRender = countries.length > 10 ? (<p>Too many matches, specify another filter countries</p>)
                    : countries.length === 1 ? (<DisplayOneCountry country={countries[0]}  countryWeather={countryWeather} />)
                    : (<DisplayManyCountries countries={countries} handleOnClick={handleOnclick} />)
    return (
        <>
          {toRender} 
        </>
    );
};

export default Display