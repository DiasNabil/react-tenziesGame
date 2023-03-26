import React from 'react'
import Die from './components/Die'
import _ from 'lodash'
import {nanoid} from 'nanoid'
import './App.css'

export default function App(){

  const [randArray , setRandArray] = React.useState(randDice)

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
      return die.id === id ? {...die, isHeld : !die.isHeld} : {...die}
    }))
  }

  function handleRoll(){
    
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
      <div className="text">
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className="dices">
        {diceElements}
      </div>
      <button onClick={handleRoll}>Roll</button>
    </main>
  )
}

