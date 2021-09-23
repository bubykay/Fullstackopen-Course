import axios from 'axios'
import env from 'react-dotenv'



// const baseURL = 'https://restcountries.eu/rest/v2/'
const baseURL = 'http://api.countrylayer.com/v2/'
const weather_baseURL = 'http://api.weatherstack.com/current'
const access_key = env.ACCESS_KEY
const weather_accesss_key = env.WEATHER_ACCESS_KEY


// export const getCountry = (endpoint) => {
//     return axios.get(`${baseURL}${endpoint}`)
// }

export const getCountry = (endpoint) => {
    return axios({
        method: "GET",
        baseURL : baseURL + endpoint,
        params: {
            access_key
        }
    })
}


export const getWeather = (query) => {
    if(query){
        return axios({
            method: "GET",
            baseURL: weather_baseURL,
            params:{
                access_key: weather_accesss_key,
                query
            }
    
        })
    }
    return
}