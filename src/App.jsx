import React from 'react'
import Die from './components/Die'
import _ from 'lodash'
import {nanoid} from 'nanoid'
import './App.css'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

export default function App(){
  const {width, height} = useWindowSize()

  const [randArray , setRandArray] = React.useState(randDice)
  const [tenzies , setTenzies] = React.useState(false)

  React.useEffect(()=>{
    randArray.every(die => die.isHeld && die.value === randArray[0].value) && setTenzies(prev => true)
  },[randArray])
  

  function randDice(){
    let array = []
    for(let i = 0; i < 10; i++){
      array.push({id: nanoid(), value : _.random(1, 6), isHeld: false})
    }
    console.log(array)

    return array
  }
  
  function handleHeld(id){
    setRandArray(prev => prev.map(die => {
      return die.id === id ? {...die, isHeld : !die.isHeld} : die
    }))
  }

  function handleRoll(){
    if(tenzies) {
      setTenzies(false)
      setRandArray(prev => prev.map(die => {
        return {...die, isHeld: false, value:_.random(1, 6)}
      }))
    }else 
    setRandArray(prev => prev.map(die=>{
      return die.isHeld=== false ? {...die, value: _.random(1, 6)} : {...die}
    }))
  }

  const diceElements = randArray.map(die => {
    return (
      <Die isHeld={die.isHeld} handleHeld={handleHeld} key={die.id} id={die.id} value={die.value} />
    )
  })

  return (
    <main>
      {tenzies && <Confetti width={width} height={height} /> }
      
      <div className="text">
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className="dices">
        {diceElements}
      </div>
      <button onClick={handleRoll}>{tenzies? "Nice !" : "Roll"}</button>
    </main>
  )
}

