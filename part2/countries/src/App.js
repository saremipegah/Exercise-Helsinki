import axios from 'axios';
import React from 'react'
import { useEffect ,useState } from 'react';



function App() {
  const [value,setValue]=useState('');
  const [countries,setCountries]=useState([]);
  const [suggestions,setSuggestions]=useState([]);
  const [error,setError]=useState('');
  const [weather,setWeather]=useState(null);


 

  useEffect(()=>{
    if (value) {
    axios
    .get(`https://restcountries.com/v3.1/name/${value}`)
    .then(response => {
     const data= response.data;
     console.log(data)
     if(data.length > 10){
      console.log("data > 10 " , data);
      setError('Too many countries, please make your query more specific.');
      setCountries([]);
      setSuggestions([]);
      console.log("error",error);
     } else if(data.length > 1 && data.length <= 10){
      setError('')
      setCountries([])
      setSuggestions(data.map(countries => countries.name.common))
     } else if(data.length === 1 ){
      setError('')
      setCountries(data || [])
      setSuggestions([])
      if(data[0]?.capital){
        fetchWeather(data[0].capital);
      }

     }
     
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      setError('An error occurred while fetching data.');
      setCountries([])
      setSuggestions([])
    });
  } else if(!value){
    setSuggestions([]);
    setError('');
  }
  },[value]);


 const handleChange = (event)=>{
  setValue(event.target.value)
 }

 
 const handleSuggestin = (suggestion)=> {
  setValue(suggestion);
  setSuggestions([]);

 } 

 const fetchWeather = async capital => {
  try {
    const apiKey = process.env.REACT_APP_API_KEY;
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`
    );
    setWeather(weatherResponse.data);
    console.log("weather" , weather)
  } catch (error) {
    console.error('Error fetching weather data:', error);
    setWeather(null);
  }
};





  return (
    <>
      <label htmlFor="">Find Countries: </label>
      <input value={value} onChange={handleChange} />

      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion,index)=>(
            <li key={index}>
              {suggestion}

              <button onClick={() =>handleSuggestin(suggestion)}> Show</button>
            </li>
          ))}
        </ul>
      )}

     
      {countries.length > 0 && (
        <div>
          <h2>{countries[0].name.common}</h2>
          <p>Capital: {countries[0].capital}</p>
          <p>Population: {countries[0].population}</p>
          <p>Area: {countries[0].area} square kilometers</p>
           {countries.length > 0 && (
             <div>
              <h3>Languages : </h3>
              <ul>
                {Object.entries(countries[0].languages).map(([code,name])=>(
                  <li key={code}>{name}</li>
                ))}
              </ul>
             </div>
           )}
            {countries[0].flags && (
              <div>
               <h3>Flag:</h3>
              
            <img
              src={countries[0].flags.png}
              alt={`${countries[0].name.common} flag`}
              style={{ width: "100px" }}
            />
            </div>
            )}
            {weather && (
              <div>
                <h2> weather in {countries[0].capital}</h2>
                <p>Temperature :{Math.floor(weather.main.temp-273.15)}°C</p>
                <img
                style={{ margin: '20px 0' }}
                width="100px"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={`${countries[0].name.common} weather icon`}
                />
                 <p>Wind: {weather.wind.speed}</p>
              </div>
            )
              
            }

            {error && <p>{error}</p>}
        </div>
      )}
       
    </>
  )
}

export default App