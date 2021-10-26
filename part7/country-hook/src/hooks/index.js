import { useEffect, useState } from 'react';
import axios from 'axios';

export const useCountry = (countryName) => {
    const [country, setCountry] = useState(null);

    const baseURL = `https://restcountries.com/v2/name/${countryName}?fullText=true`;

    const getall = async function getCountry(){
        const countryInfo = await axios({
            method: 'GET',
            baseURL
        });
        const finalCountry = { ...countryInfo, found: true };
        if(countryInfo.data.status=== 404){
            return setCountry({ found:false });
        }
        setCountry(finalCountry);
    };

    useEffect(() => {
        if(countryName){
            getall();
        }
    },[countryName]);


    return country;

};