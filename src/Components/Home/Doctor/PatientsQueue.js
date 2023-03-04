import React, { useState } from 'react'
import LeftArrow from '../../../Images/LeftArrow';
import RightArrow from '../../../Images/RightArrow'
import PatientQueueOne from './PatientQueueOne';

const PatientsQueue = ({patientsRequested,doctorAddresses,doctorName,setRefresh}) => {
    const [totalView,setTotalView]=useState(true);
    const [patientAddress,setPatientAddress]=useState("")

    const clickHandler=(item)=>{
        setPatientAddress(item)
        setTotalView(false)

    }
  return (
    // <div>
    //     {patientsRequested.map((ele,index)=><h2>{index}{" "}{ele}</h2>)}
    // </div>
 <> {
    totalView===true ? <div className='doctorDetails'>
    <div className='doctorItem extraItem'>
        <p className='p1' style={{textAlign:"center"}}>id</p>
        <p className='p2'>Address</p>
        <p className='p3' style={{margin:"auto"}}>Open</p>
        
    </div>

    {
        patientsRequested.map((item,index)=>
            <div className='doctorItem'>
                <p className='p1' style={{textAlign:"center"}}>{index}</p>
                <p className='p2'>{item}</p>
                <div style={{margin:"auto"}} className="nextButton" onClick={()=>clickHandler(item)}>
                    <RightArrow color='var(--mainColor--)'></RightArrow>
                    </div>
                
                
            </div>)
    }
</div>
:<PatientQueueOne patientAddress={patientAddress} doctorAddresses={doctorAddresses} doctorName={doctorName} setRefresh={setRefresh} setTotalView={setTotalView}></PatientQueueOne>
   }</> 
  )
}

export default PatientsQueue