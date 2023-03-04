import React from 'react'

const TextRecord = ({text='',onChangeHandler,textValue,width}) => {
  return (
    <div className='textRecord' style={{width:`${width}`}} >
    <p>{text}</p>
    <input className='textRecordInput' onChange={(e)=>onChangeHandler(e)} value={textValue}></input>
</div> 
)
}

export default TextRecord