import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import TextField from './TextField'
import { AppContext } from '../../App'

import './Register.css';

import RegisterAdmin from './RegisterAdmin';
import RegisterDoctor from './RegisterDoctor';
import RegisterPatient from './RegisterPatient';
const Register = () => {
    const {currentId}=useContext(AppContext)


   

    // const [doctorName,setDoctorName]=useState("")
    // const [doctorUniqueId,setDoctorUniqueId]=useState("")
    
    // const [contract,setContract]=useState(null);
   

   
    // const doctorClickHandler=()=>{
        
    // }


  return (
    <div className='authBox'>
        <div className='register'>
            <h1>Register</h1>
            {currentId===0&&<RegisterAdmin></RegisterAdmin>}
            {currentId===1&& <RegisterDoctor></RegisterDoctor>}
            {currentId===2&&<RegisterPatient></RegisterPatient>}
        
     
           
        </div>

    </div>
  )
}

export default Register