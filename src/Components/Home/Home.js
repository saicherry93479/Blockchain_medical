import React, { useContext } from 'react'
import { AppContext } from '../../App'
import AdminHome from './Admin/AdminHome'
import DoctorHome from './Doctor/DoctorHome'
import PatientHome from './Patient/PatientHome'

const Home = () => {

    const {currentId}=useContext(AppContext)

    return (
        <>
        {currentId===0 && <AdminHome></AdminHome>}
        {currentId===1 && <DoctorHome></DoctorHome>}
        {currentId===2 && <PatientHome></PatientHome>}
        </>
      )


  
}

export default Home