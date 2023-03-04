import React, { useEffect, useState } from 'react'
import { webFunction } from '../../../Utils/ContractUtil'

const SingleRecord = ({uid}) => {
    const [data,setData]=useState([])

    useEffect(()=>{
        recordData().then(result=>{
            setData(result)
        })

    },[])


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
    <div className='doctorItem '>
        <p className='p11'>{uid}</p>

        <p className='p13'>{data["5"]}</p>
        <p className='p14'>{data["4"]}</p>

    </div>
  )
}

export default SingleRecord