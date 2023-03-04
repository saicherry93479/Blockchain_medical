import React from 'react'
import './HomeButton.css'
const HomeButton = ({text,clickHandler,active,current}) => {
  return (
    <div className='homeButton' onClick={()=>clickHandler()} style={active===current?{backgroundColor:'blue'}:{}}>
        <p style={active===current?{color:"white"}:{}}>{text}</p>
    </div>
  )
}

export default HomeButton