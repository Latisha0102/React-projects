/* eslint-disable react/jsx-no-duplicate-props */
import React from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


function Folder()
{
   function generateNewdice(){
    return{
      value:Math.ceil(Math.random()*6),
      isheld: false,
      id:nanoid()
   }
   }
  function allnewDice()
  {
    const newDice=[]
    for(let i=0;i<10;i++){
      newDice.push(generateNewdice())
    }
    return newDice
  }
  
  const [dice,setdice]=React.useState(allnewDice())
  
  const[count,setCount]=React.useState(0)

    function rolldice()
    {
      
      if(!tenzies)
      {
        setCount(prevCount => prevCount+1)
       setdice(oldDice=>(oldDice.map(die=>{
        return die.isheld?
         die:generateNewdice()
        })))
    }
    else{
      setTenzies(false)
      setdice(allnewDice())
      setCount(prevcount =>0)
    }
    
    } 
  
    const [tenzies,setTenzies]=React.useState(false)

     React.useEffect(()=>{
       const allHeld=dice.every(die=> die.isheld)
       const firstValue=dice[0].value
       const allvalue = dice.every(die=>die.value=== firstValue)

       if(allHeld&& allvalue){
         setTenzies(true)
         alert("You Won!!!!!")
       }
     },[dice])

     const diceElements= dice.map(die=>(
      <Die 
        key={die.id} 
        value={die.value} 
        isheld={die.isheld}  
        holdDice={()=> (holdDice(die.id))} />)
      )
      function holdDice(id){
        setdice(oldDice => oldDice.map(die => {
          return die.id === id ? {...die, isheld: !die.isheld}: die }
        )
        )
      }
      
    
    return(
      <main>
      {tenzies && <Confetti/>}
       <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">{diceElements}</div>
        
        <button 
            className="roll" 
            onClick={rolldice}
           >
            {tenzies ?"New Game":"Roll"}
            
        </button>
        <h2 className="text-count">The total number of time the diced roll={count}</h2>
        
      </main>

        )
}

export default Folder