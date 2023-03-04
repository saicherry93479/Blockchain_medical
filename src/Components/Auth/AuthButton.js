import React from 'react'
import "./AuthButton.css"
const AuthButton = ({text,clickHandler,widthG="100%",colorP="white"}) => {
  return (
    <div className='authButton' onClick={()=>clickHandler()} style={{width:widthG}}>
        <p style={{color:colorP}}>{text}</p>
    </div>
  )
}

export default AuthButton