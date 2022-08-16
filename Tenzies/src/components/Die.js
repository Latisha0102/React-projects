import React from "react"

function Die(props)
{
    const styles={
            backgroundColor: props.isheld ? "#59E391":  "white" 
        }
    return(
        <div className="dice-face" onClick={props.holdDice}     style={styles}>
            <h2 className="die-num">{props.value}</h2>  
        </div>
    )
}
export default Die