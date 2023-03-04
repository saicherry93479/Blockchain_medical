import React, { useEffect, useState } from 'react'
import { webFunction } from '../../../Utils/ContractUtil'
import './PatientDeatils.css'
const PatientDetails = () => {

  const [data,setData]=useState([])
  useEffect(()=>{
      patientDetail()
  },[])
  const patientDetail=async (address)=>{
      const {accounts,contract}=await webFunction();
      const data=await contract.methods.getAllPatients().call({
          from:accounts[0]
      });
      console.log("doctor each ",data)
      setData(data)
    }
  return (
    <div className='doctorDetails'>
    <div className='doctorItem extraItem'>
        <p className='p1'>Name</p>
        <p className='p2'>Address</p>
        <p className='p3'>uniqueId</p>
        <p className='p4'>Records</p>
        
    </div>

    {
        data.map(item=>
            <div className='doctorItem'>
                <p className='p1'>{item["0"]}</p>
                <p className='p2'>{item["1"]}</p>
                <p className='p3'>{item["2"]}</p>
                <p className='p4'>{item["3"].length}</p>
                
                
            </div>)
    }
</div>
   
  )
}

export default PatientDetails