import React, { useEffect, useState } from 'react'
import { webFunction } from '../../../Utils/ContractUtil'
import './PatientHome.css'

const PatientAppoint = () => {
    const [data,setData]=useState([])
    const [refresh,setRefresh]=useState(false)
    useEffect(()=>{
        doctorDetail()
    },[refresh])
    const doctorDetail=async (address)=>{
        const {accounts,contract}=await webFunction();
        const data=await contract.methods.getAllRegisteredDoctors(accounts[0]).call({
            from:accounts[0]
        });
        console.log("doctor each ",data)
        setData(data)


    }
    const clickHandler=async (addr)=>{
        console.log("in clickhandler is book appoint  ",addr)
        const {accounts,contract}=await webFunction();
        const result=await contract.methods.addPatientRequested(addr).send(
            {
                from :accounts[0]

            })
            console.log("result is ",result);
            setRefresh(p=>!p)

    }
  return (
    <div className='doctorDetails'>
        <div className='doctorItem extraItem'>
            <p className='p1'>Name</p>
            <p className='p2'>Address</p>
            <p className='p3'>uniqueId</p>
            <p className='p4'>Book</p>
        </div>

        {
            data.map(item=>
                <div className='doctorItem'>
                    <p className='p1'>{item["0"]}</p>
                    <p className='p2'>{item["1"]}</p>
                    <p className='p3'>{item["2"]}</p>
                    {item["5"]?'Booked':<div className='book' onClick={()=>clickHandler(item["1"])}><p>Book</p></div>}
 
                    
                </div>)
        }
    </div>
    
  )
}

export default PatientAppoint