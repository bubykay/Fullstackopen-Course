import React from 'react';

const Weather = ({countryName, countryWeather}) => {
    const nation=countryWeather?.current
    return (
        <>
            <h1>Weather in {countryName}</h1>
            <p>Temperature:{nation?.temperature}</p>
            <img src={nation?.weather_icons[0]} alt="" />
            <p>Wind:{nation?.wind_speed} mph direction {nation?.wind_dir}</p>
        </>
    );
};

export default Weather;