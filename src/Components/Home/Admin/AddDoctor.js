
import React, { useContext, useState } from 'react'
import { AppContext } from '../../../App'
import { webFunction } from '../../../Utils/ContractUtil'
import AuthButton from '../../Auth/AuthButton'
import TextField from '../../Auth/TextField'
import './AddDoctor.css'
import { AdminContext } from './AdminHome'
const AddDoctor = () => {
    const {setRefresh}=useContext(AdminContext)
    const [errorDoctor,setErrorDoctor]=useState(false)
    const [errorPatient,setErrorPatient]=useState(false)
    const [doctorId,setDoctorId]=useState("")
    const [patientId,setPatientId]=useState("")

    const doctorHandler=async ()=>{
        if(doctorId.length===0){
            setErrorDoctor(true)
            return
        }
        var uid;
        try{
            uid=parseInt(doctorId)
            setErrorDoctor(false)
        }catch(er){
            setErrorDoctor(true)
            return
        }
        try{
            const {accounts,contract}=await webFunction();
            const results=await contract.methods.checkDoctorUniqueIdPresent(uid).call({
                from:accounts[0]
            })
            if(results===true){
                setErrorDoctor(true)
                return
            }else{
                setErrorDoctor(false)
                const results=await contract.methods.addDoctorUniqueId(uid).send({
                    from:accounts[0]
                })
                setDoctorId("")
                setRefresh(p=>!p)
               
            }
        }catch(ee){
            setErrorDoctor(true)
            return
        }
        setErrorDoctor(false)
    }
    const patientHandler=async ()=>{
        if(patientId.length===0){
            setErrorPatient(true)
            return
        }
        var uid;
        try{
            uid=parseInt(patientId)
            setErrorDoctor(false)
        }catch(er){
            setErrorPatient(true)
            return
        }
        try{
            const {accounts,contract}=await webFunction();
            const results=await contract.methods.checkPatientUniqueIdPresent(uid).call({
                from:accounts[0]
            })
            if(results===true){
                setErrorPatient(true)
                return
            }else{
                setErrorPatient(false)
                const results=await contract.methods.addPatientUniqueId(uid).send({
                    from:accounts[0]
                })
                setPatientId("")
                setRefresh(p=>!p)
                
            }
        }catch(ee){
            setErrorPatient(true)
            return
        }
        setErrorPatient(false)

    }
  return (
    <div className='doctorAddForm'>
        <TextField text={"ADD DOCTOR ID"}  textValue={doctorId} onChangeHandler={(e)=>setDoctorId(e.target.value)} ></TextField>
        {errorDoctor?<p>Already Unique Id prenset or Some Error</p>:<></>}
        <AuthButton text={"Add doctor id"} clickHandler={doctorHandler} ></AuthButton>
        <div className='seaprator'></div>

        <TextField text={"ADD PATIENT ID"} textValue={patientId} onChangeHandler={(e)=>setPatientId(e.target.value)}></TextField>
        {errorPatient?<p>Already Unique Id prenset or Some Error</p>:<></>}
        <AuthButton text={"Add Patient id"} clickHandler={patientHandler}></AuthButton>
    </div>

  )
}

export default AddDoctor