import React from 'react'
import './TextField.css'
const TextField = ({text='',onChangeHandler,textValue}) => {
  return (
    <div className='textField' >
        <p>{text}</p>
        <input className='textFieldInput' onChange={(e)=>onChangeHandler(e)} value={textValue}></input>
    </div>
  )
}

export default TextField