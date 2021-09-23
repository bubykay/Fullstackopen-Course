import React from 'react';
import Weather from './Weather';

const DisplayOneCountry = ({country, countryWeather}) => {
    return (
        <>
                <h1>{country.name}</h1>
                <div>
                    Capital: {country.capital}
                </div>
                <h1>Spoken Languages</h1>
                <Weather countryName={country.name} countryWeather={countryWeather}  />
        </>
    );
};

export default DisplayOneCountry;