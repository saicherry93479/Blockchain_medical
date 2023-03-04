import React, { useState } from 'react'
import './PatientRecord.css'
import SeparateRecord from './SeparateRecord'
import SinglePatientRecord from './SinglePatientRecord'
const PatientsRecord = ({patientRecords}) => {
  const [view,setView]=useState(false)
  const [recordId,setRecordId]=useState("")
  return (
   <>
   {view?<SeparateRecord setView={setView} recordId={recordId}></SeparateRecord>: <div className='doctorDetails'>
      <div className='doctorItem extraItem extraPatientRecord'>
            <p className='p21'>Id</p>
           
            <p className='p23'>Issued By</p>
            <p className='p24'>Doctor Address</p>
            <p className='p25'>QR</p>
           
      </div>
      {
        patientRecords.map((item,index)=>
          <SinglePatientRecord uid={item} setView={setView} setRecordId={setRecordId} index={index} ></SinglePatientRecord>
         )
      }

    </div>}
   </>
  )
}

export default PatientsRecord