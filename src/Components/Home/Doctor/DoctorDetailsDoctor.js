import React from 'react'
import TextField from '../../Auth/TextField'

const DoctorDetailsDoctor = ({doctorName,doctorAddresses,doctorUniqueId,patientsRequested}) => {
  return (
    <div className='adminDetails'>
    <TextField text={"DOCTOR ADDRESS"} textValue={doctorAddresses}></TextField>
    <TextField text={"DOCTOR NAME"} textValue={doctorName}></TextField>
    <TextField text={"UNIQUE ID"} textValue={doctorUniqueId}></TextField>
    <TextField text={"NO OF Patients Requested"} textValue={patientsRequested.length}></TextField>
</div>
  )
}

export default DoctorDetailsDoctor