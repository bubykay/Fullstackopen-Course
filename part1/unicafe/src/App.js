import React, {useState} from 'react'

const Button = ({handleclick, value}) => {
 return(
  <>
    <button onClick={handleclick}>{value}</button>
  </>
 )
}

const StatisticsLine = ({text, value}) => {
  return (
    <>
      <p>{text} {value}</p>
    </>
  )
}

const Header = ({header}) => {
  return (
    <>
      <h1>{header}</h1>
    </>
  )
}

const Statistics = ({good, bad, neutral})=>{
  const all = good + bad + neutral
  const average = (good  - bad)/all
  const percentagePositive = (good/all * 100).toString().concat('%')
  if(bad>0||good>0||neutral>0){
  return (
    <>
      <Header header="Statistics" />
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={all} />
      <StatisticsLine text="average" value={average} />
      <StatisticsLine text="positive" value={percentagePositive}/>
    </>
  )}
    return(
      <>
        <p>No statistics given</p>
      </>
    )
  
}


function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleBad = () => setBad(bad + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  return (
    <div>
      <Header header="give feedback" />
      <Button handleclick={handleGood} value="good" />
      <Button handleclick={handleNeutral} value="neutral" />
      <Button handleclick={handleBad} value="bad" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
}

export default App;
