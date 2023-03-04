import React, { useContext, useEffect, useState } from 'react'
import { webFunction } from '../../../Utils/ContractUtil'
import { AdminContext } from './AdminHome'
import './DoctorDetails.css'
const DoctorDetails = () => {
    const {doctorAddresses}=useContext(AdminContext)
    const [data,setData]=useState([])
    useEffect(()=>{
        doctorDetail()
    },[])
    const doctorDetail=async (address)=>{
        const {accounts,contract}=await webFunction();
        const data=await contract.methods.getAllRegisteredDoctors('0x52bA08a2e96d08149b1aC0005F6b6010E5077f8D').call({
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
            <p className='p5'>Patients</p>
        </div>

        {
            data.map(item=>
                <div className='doctorItem'>
                    <p className='p1'>{item["0"]}</p>
                    <p className='p2'>{item["1"]}</p>
                    <p className='p3'>{item["2"]}</p>
                    <p className='p4'>{item["3"].length}</p>
                    <p className='p5'>{item["4"].length}</p>
                    
                </div>)
        }
    </div>
  )
}

export default DoctorDetails