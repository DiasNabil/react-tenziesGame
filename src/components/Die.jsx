import React from 'react'
import './Die.css'

export default function Die(props) {
    return (
        <div className={`${props.isHeld && "held"} die`} onClick={()=> props.handleHeld(props.id)} >
            {props.value}
        </div>
     )
}