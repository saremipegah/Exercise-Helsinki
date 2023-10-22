import axios from 'axios';
import React from 'react'
import { useEffect ,useState } from 'react';



function App() {
  const [countries,setCountries]=useState([]);
  const [value,setValue]=useState('');
  const [error,setError]=useState('');
  const [suggestions,setSuggestions]=useState([]);

 

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

            {error && <p>{error}</p>}
        </div>
      )}
       
    </>
  )
}

export default App