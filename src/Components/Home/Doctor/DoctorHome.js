import React, { createContext, useEffect, useState } from 'react'
import { webFunction } from '../../../Utils/ContractUtil';
import HomeButton from '../HomeButton';

import DoctorDetailsDoctor from './DoctorDetailsDoctor';
import PatientsQueue from './PatientsQueue';

import Records from './Records';

export const DoctorContext=createContext();
const DoctorHome = () => {
    const [currentView,setCurrentView]=useState(0)
    const [refresh,setRefresh]=useState(false);
    const [doctorAddresses,setDoctorAddresses]=useState("")
    const [doctorName,setDoctorName]=useState("")
    const [doctorUniqueId,setDoctorUniqueId]=useState("")
    const [recordsIssued,setRecordsIssued]=useState([])
    const [patientsRequested,setPatientsRequested]=useState([])

    useEffect(()=>{
      getDoctor().then(result=>{
        setDoctorName(result["0"])
        setDoctorAddresses(result["1"])
        setDoctorUniqueId(result["2"])
        setPatientsRequested(result["3"])
        setRecordsIssued(result["4"])
      })
    },[refresh])

    const getDoctor=async ()=>{
      const {accounts,contract}=await webFunction();
      const result=await contract.methods.getDoctor().call({
          from:accounts[0]
      })
      console.log("in doctor home")
      console.log(result)
      return result;
  }


  return (
   
        <div className='homeBox'>
            <div className='homeLeft'>
            <h1>DOCTOR</h1>
            <HomeButton text={"Profile"} clickHandler={()=>{setCurrentView(0)}} current={currentView} active={0}></HomeButton>
            <HomeButton text={"Patients-Queue"} clickHandler={()=>{setCurrentView(1)}} current={currentView} active={1}></HomeButton>
            <HomeButton text={"Records-Issued"} clickHandler={()=>{setCurrentView(2)}} current={currentView} active={2}></HomeButton>
            


            </div>
            <div className='homeRight'>
            {currentView===0&&<DoctorDetailsDoctor doctorName={doctorName} doctorAddresses={doctorAddresses} doctorUniqueId={doctorUniqueId} patientsRequested={patientsRequested}></DoctorDetailsDoctor>}
            {currentView===1 && <PatientsQueue patientsRequested={patientsRequested} doctorAddresses={doctorAddresses} doctorName={doctorName}  setRefresh={setRefresh}></PatientsQueue>}
            {currentView===2&&<Records recordsIssued={recordsIssued}></Records>}

            </div>
        </div>
  

  )
}

export default DoctorHome