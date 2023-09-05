import { useState } from 'react'

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodtClick =() =>{
    setGood(good + 1)
  }
  const handleNeutraltClick =() =>{
    setNeutral(neutral + 1)
  }
  const handleBadtClick =() =>{
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feed back</h1>
       <button onClick={handleGoodtClick}>good</button>
       <button onClick={handleNeutraltClick}>neutral</button>
       <button onClick={handleBadtClick}>bad</button>
       <h2>Statistics</h2>
       <p>good {good}</p>
       <p>neutral {neutral}</p>
       <p>bad {bad}</p>
    </div>
  )
}

export default App