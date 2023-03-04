import React from 'react'
import TextField from '../../Auth/TextField'
import './DrugAdd.css'
import TextRecord from './TextRecord'
const DrugAdd = ({setDrug,setDays,setPerDay,drug,days,perDay,show,clickHandler=()=>{}}) => {
  return (
    <div className='drugAdd'>
        <TextRecord width='200px' textValue={drug} onChangeHandler={(e)=>setDrug(e.target.value)}></TextRecord>
        <TextRecord width='200px' textValue={days} onChangeHandler={(e)=>setDays(e.target.value)}></TextRecord>
        <TextRecord width='200px' textValue={perDay} onChangeHandler={(e)=>setPerDay(e.target.value)}></TextRecord>
        {
            show && <div className='inputButton' style={{backgroundColor:"crimson"}} onClick={clickHandler}><p style={{color:'white'}}>Remove</p></div>
        }
    </div>
  )
}

export default DrugAdd