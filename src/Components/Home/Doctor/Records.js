import React, { useEffect, useState } from 'react'
import { webFunction } from '../../../Utils/ContractUtil';
import SingleRecord from './SingleRecord';
import './Record.css'
const Records = ({recordsIssued}) => {
  
  useEffect(()=>{
    
  },[])

  

 
  return (
    <div className='doctorDetails'>
      <div className='doctorItem extraItem'>
            <p className='p11'>Id</p>
           
            <p className='p13'>Issued To</p>
            <p className='p14'>Partient Address</p>
           
      </div>
      {
        recordsIssued.map(item=>
          <SingleRecord uid={item}></SingleRecord>
         )
      }

    </div>
  )
}

export default Records

