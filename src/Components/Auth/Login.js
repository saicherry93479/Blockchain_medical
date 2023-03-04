import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App';
import { webFunction } from '../../Utils/ContractUtil';

import LoginAdmin from './LoginAdmin';
import LoginDoctor from './LoginDoctor';
import LoginPatient from './LoginPatient';

const Login = () => {
    const {currentId,setAddress,address}=useContext(AppContext)

    useEffect(()=>{
        updateAddress().then((result)=>{
            console.log("in login address is ",address)
        })

    })
    const updateAddress=async ()=>{
        const {accounts,contract}=await webFunction();
        setAddress(accounts[0])
    }
    
    
   
  return (
    <div className='authBox'>
        {currentId===0&&<LoginAdmin></LoginAdmin>}
        {currentId===1&&<LoginDoctor></LoginDoctor>}
        {currentId===2 && <LoginPatient></LoginPatient>}
    </div>
  )
}

export default Login