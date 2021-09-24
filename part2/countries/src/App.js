import React, { useEffect, useState } from 'react'


import Display from './components/Display'
import FindCountry from './components/FindCountry'
import {getCountry, getWeather} from './utils/requests'


function App() {
  const [countries, setCountries] = useState([])
  const [value, setValue]= useState("")
  const [oneCountry, setOneCountry]=useState([])
  const [weather, setWeather] = useState([])

  useEffect(()=>{
    getCountry('all').then(country=>setCountries(country.data))
  },[])

  const handleSearch = event => {
    setOneCountry([])
    setValue(event.target.value)
  }


  let contryToDisplay =oneCountry.length?oneCountry: value.length?countries.filter(country=>country.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
                          :countries


  const handleOnClick = country => {
    setOneCountry([country])
  }

  useEffect(()=>{
    const country = oneCountry[0]?.name?oneCountry[0].name
                    :contryToDisplay.length===1?contryToDisplay[0].name:null
    getWeather(country)?.then(response=>{
      console.log(response)
      (setWeather(response.data))
    }).catch(err=>console.log(err))
  },[oneCountry,contryToDisplay])

 
                          

  return (
    <div>
       <FindCountry  vlaue={value} onChange={handleSearch} />
       <Display countries={contryToDisplay} handleOnclick={handleOnClick} oneCountry={oneCountry} countryWeather={weather} />
    </div>
  );
}

export default App;
