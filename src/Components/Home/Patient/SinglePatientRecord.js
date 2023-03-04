import React, { useContext, useEffect, useState } from 'react'

import Qr from '../../../Images/Qr'
import RightArrow from '../../../Images/RightArrow'
import { webFunction } from '../../../Utils/ContractUtil'
import { PatientContext } from './PatientHome'

const SinglePatientRecord = ({uid,setView,setRecordId,index}) => {
    const [data,setData]=useState([])

    useEffect(()=>{
        recordData().then(result=>{
            setData(result)
        })

    },[])
  

   

    const clickHandler=()=>{
      
      setRecordId(uid)
      setView(true)
    }


    const recordData=async ()=>{
        const {accounts,contract}=await webFunction();
        const result=await contract.methods.getRecord(uid).call(
          {
            from :accounts[0]
          }
        )
        console.log(`record result for ${uid} is ${result}`)
        return result
    
      }
  return (
    <div className='doctorItem  extraPatientRecord'>
        <p className='p21' >{index} </p>

        <p className='p23'>{data["6"]}</p>
        <p className='p24'>{data["3"]}</p>
        {/* <div className='d25'>
            <Qr></Qr>
        </div> */}
        <div style={{margin:"auto"}} className="nextButton" onClick={()=>clickHandler()}>
            <RightArrow color='var(--mainColor--)'></RightArrow>
        </div>

    </div>
  )
}

export default SinglePatientRecord