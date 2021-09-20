import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}
const Header = ({header}) => {
  return(
      <h1>{header}</h1>
  )
}

const DisplayAnecdote = ({anecdote, votes, selected})=> {
  return (
    <>
      <p>
        {anecdote}
      </p>
      <HasVote votes={votes} selected={selected} /> 
    </>
  )
}

const MostVote = ({votes, anecdote}) => {
  const mostVoted = Math.max(...Object.values(votes))
  for(let key in votes){
    if(votes[key]===mostVoted){
      return (
        <>
          <p>{anecdote[key]}</p>
          <p>has {mostVoted} votes</p>
        </>
        
      )
    }
  }
  return(
    <p>Please vote</p>
  )
}

const HasVote = ({selected, votes}) => {
  return (
    <>
      <p>has {votes[selected]?votes[selected]:0} votes</p>
    </>
  )
}

function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState({})

  const randomNumber = () => {
    const random = Math.random()
    return Math.floor(random*anecdotes.length)
  }
  const handleClick = ()=>setSelected(randomNumber())
  const handleVote = ()=> {
    let votes = {...vote}
    votes[selected]?votes[selected] += 1:votes[selected] = 1
    setVote(votes)
  }


  return (
    <div >
      <Header header="Anecdote of the day" />
      <DisplayAnecdote anecdote={anecdotes[selected]} selected={selected} votes={vote} />
      <Button text="Vote" handleClick={handleVote} />
      <Button handleClick={handleClick} text="Next anecdote" />
      <Header header="Anecdotes with most votes" />
      <MostVote votes={vote} anecdote={anecdotes} />
    </div>
  );
}

export default App;
