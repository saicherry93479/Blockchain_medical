import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { webFunction } from '../../Utils/ContractUtil';
import AuthButton from './AuthButton';
import TextField from './TextField';
import { AppContext } from '../../App'

const RegisterAdmin = () => {
    const navigate=useNavigate();
    const {currentId,address}=useContext(AppContext)
    const [adminAddress,setAdminAddress]=useState(null)
    const [name,setName]=useState("")
    const [error,setError]=useState(false)

    useEffect(()=>{
        setAdminAddress(address)
        
    })


    const registerHandler=async ()=>{
        console.log("registereing the admin ")

        const {accounts,contract}=await webFunction();
        const result=await contract.methods.registerAdmin(name).send(
            {
                from:accounts[0]
            }
        )
        navigate("/login")
        console.log("😊 successfully admin registerd");
    }
    

    

  return (
    <>
    <TextField text={"Address"} textValue={adminAddress} onChangeHandler={()=>{}} ></TextField>
    <TextField text={"Name"} textValue={name} onChangeHandler={(e)=>setName(e.target.value)} ></TextField>
    {error?<p className='errorP'>Error while Registering.Please,Try Again.</p>:<></>}
    <AuthButton text={"REGISTER"} clickHandler={registerHandler} widthG="100%" colorP='white'></AuthButton>
    </>

    
  )
}

export default RegisterAdmin