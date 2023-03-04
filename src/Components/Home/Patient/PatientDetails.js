import React, { useEffect, useState } from 'react'
import { webFunction } from '../../../Utils/ContractUtil';
import TextField from '../../Auth/TextField';

const PatientDetails = ({patientName,patientAddress,patientUniqueId,patientRecords}) => {

   
   
  return (
    <div className='adminDetails'>
        <TextField text={"PATIENT ADDRESS"} textValue={patientAddress}></TextField>
        <TextField text={"ADMIN NAME"} textValue={patientName}></TextField>
        <TextField text={"UNIQUE ID"} textValue={patientUniqueId}></TextField>
        <TextField text={"NO OF RECORDS"} textValue={patientRecords.length}></TextField>
    </div>
  )
}

export default PatientDetails