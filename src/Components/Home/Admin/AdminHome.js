import React, { createContext, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../App'
import { webFunction } from '../../../Utils/ContractUtil'
import AuthButton from '../../Auth/AuthButton'
import HomeButton from '../HomeButton'
import AddDoctor from './AddDoctor'
import AdminDetails from './AdminDetails'
import './AdminHome.css'
import DoctorDetails from './DoctorDetails'
import PatientDetails from './PatientDetails'

export const AdminContext=createContext()

const AdminHome = () => {
    
    const [adminAddress,setAdminAddress]=useState("")
    const [name,setName]=useState("")
    const [doctorIds,setDoctorIds]=useState([])
    const [doctorAddresses,setDoctorAddresses]=useState([])
    const [patientIds,setPatientIds]=useState([])
    const [patientAddresses,setPatientAddress]=useState([])
    const [refresh,setRefresh]=useState(false)
    const [currentView,setCurrentView]=useState(0)
    useEffect(()=>{
        setParams()

    },[refresh])
    useEffect(()=>{setRefresh(p=>!p)},[currentView])

    const setParams=async ()=>{
        console.log("came into setParams")
        try{
        const {accounts,contract}=await webFunction();
        console.log("addres in setParams is ",accounts[0])
        const result = await contract.methods.getAdmin().call({
            from: accounts[0],
          });
            setAdminAddress(result[1])
            setName(result[0])  
            setDoctorIds(result[2])

            setPatientIds(result[3])
            setDoctorAddresses(result[4])
            setPatientAddress(result[5])
            console.log(result)
          console.log("result ",result[0])
        //   return result

        }catch(err){
            
            console.log("err in setParams in admin details")
            console.log(err)

        }
        

    }

    
  return (
    <AdminContext.Provider
    value={{
        adminAddress,
        name,
        doctorIds,
        patientIds,
        doctorAddresses,
        patientAddresses,
        setRefresh,
        refresh

    }}
    >
    <div className='homeBox'>
        
        <div className='homeLeft'>
            <h1>ADMIN</h1>
            <HomeButton text={"Profile"} clickHandler={()=>{setCurrentView(0)}} current={currentView} active={0}></HomeButton>
            <HomeButton text={"Add UniqueId"} clickHandler={()=>{setCurrentView(1)}} current={currentView} active={1}></HomeButton>
            <HomeButton text={"Doctor Details"} clickHandler={()=>{setCurrentView(2)}} current={currentView} active={2}></HomeButton>
            <HomeButton text={"Patient details"} clickHandler={()=>{setCurrentView(3)}} current={currentView} active={3}></HomeButton>
            


        </div>
        <div className='homeRight'>
            {currentView===0&&<AdminDetails></AdminDetails>}
            {currentView===1 && <AddDoctor></AddDoctor>}
            {currentView===2&&<DoctorDetails></DoctorDetails>}
            {currentView===3 && <PatientDetails></PatientDetails>}
        </div>
    </div>
    </AdminContext.Provider>
  )
}

export default AdminHome