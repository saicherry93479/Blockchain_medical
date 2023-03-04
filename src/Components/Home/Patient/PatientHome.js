import React, { createContext, useEffect, useState } from 'react'
import { webFunction } from '../../../Utils/ContractUtil'
import HomeButton from '../HomeButton'
import PatientAppoint from './PatientAppoint'
import PatientDetails from './PatientDetails'
import './PatientHome.css'
import PatientsRecord from './PatientsRecord'
import SearchRecord from './SearchRecord'

export const PatientContext=createContext()
const PatientHome = () => {
  const [currentView,setCurrentView]=useState(0)
  const [patientName,setPatientName]=useState("");
  const [patientAddress,setPatientAddress]=useState("");
  const [patientUniqueId,setPatientUniqueId]=useState("");
  const [patientRecords,setPatientRecords]=useState([])
  const [recordNameC,setRecordNamesC]=useState([])
  const [recordIdC,setRecordIdsC]=useState([])




  useEffect(()=>{
    getPatient().then(result=>{
      setPatientName(result["0"])
      setPatientAddress(result["1"])
      setPatientUniqueId(result["2"])
      setPatientRecords(result["3"])

    })

},[])

const getPatient=async ()=>{
    const {accounts,contract}=await webFunction();
    const result=await contract.methods.getPatient(accounts[0]).call({
        from:accounts[0]
    })
    console.log("patiets ",result)
    return result;
}
  return (
    <PatientContext.Provider value={{
      recordNameC,
      recordIdC,
      setRecordIdsC,
      setRecordNamesC
    }}>
    <div className='homeBox'>
            <div className='homeLeft'>
                <h1>PATIENT</h1>
                <HomeButton text={"Profile"} clickHandler={()=>{setCurrentView(0)}} current={currentView} active={0}></HomeButton>
                <HomeButton text={"Book Appointement"} clickHandler={()=>{setCurrentView(1)}} current={currentView} active={1}></HomeButton>
                <HomeButton text={"Records"} clickHandler={()=>{setCurrentView(2)}} current={currentView} active={2}></HomeButton>
                <HomeButton text={"Search"} clickHandler={()=>{setCurrentView(3)}} current={currentView} active={3}></HomeButton>
              

                


            </div>
            <div className='homeRight'>
                {currentView===0&&<PatientDetails patientName={patientName} patientAddress={patientAddress} patientUniqueId={patientUniqueId} patientRecords={patientRecords}></PatientDetails>}
                {currentView===1 && <PatientAppoint></PatientAppoint>}
                {currentView===2&&<PatientsRecord patientRecords={patientRecords}></PatientsRecord>}
                {currentView===3&&<SearchRecord patientRecords={patientRecords}></SearchRecord>}

            </div>
    </div>
    </PatientContext.Provider>
  )
}

export default PatientHome