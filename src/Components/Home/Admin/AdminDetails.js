import React, { useContext, useEffect, useState } from 'react'
import { webFunction } from '../../../Utils/ContractUtil'
import TextField from '../../Auth/TextField'
import { AdminContext } from './AdminHome'
import './AdminDetails.css'
const AdminDetails = () => {
   
  const {adminAddress,name,doctorIds,patientIds,doctorAddresses,patientAddresses}=useContext(AdminContext)
//   useEffect(()=>{setRefresh(p=>!p)})
  return (
    <div className='adminDetails'>
        <TextField text={"ADMIN ADDRESS"} textValue={adminAddress} onChangeHandler={()=>{}}></TextField>
        <TextField text={"ADMIN NAME"} textValue={name} onChangeHandler={()=>{}}></TextField>
        <TextField text={"NO OF DOCTOR ID'S"} textValue={doctorIds.length} onChangeHandler={()=>{}}></TextField>
        <TextField onChangeHandler={()=>{}} textValue={doctorAddresses.length} text={"NO OF DOCTORS"}></TextField>
        <TextField text={"NO OF PATIENT ID'S"} textValue={patientIds.length} onChangeHandler={()=>{}}></TextField>
        <TextField onChangeHandler={()=>{}} textValue={patientAddresses.length} text={"NO OF DOCTORS"}></TextField>
    </div>
  )
}

export default AdminDetails