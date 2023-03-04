import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { webFunction } from '../../Utils/ContractUtil';
import AuthButton from './AuthButton';
import TextField from './TextField';
import { checkAdminPresent, checkPatientpresent } from './Utils';

const LoginPatient = () => {
    const navigate=useNavigate();
    const [patientAddress,setPatientAddress]=useState("")
    const [patientName,setPatientName]=useState("")
    const [uniqueId,setUniqueId]=useState("")
    const [adminView,setAdminView]=useState(false)
    const [view,setView]=useState(false)

    useEffect(()=>{
        checkAdminPresent().then(result=>{
            if(result===true){
                setAdminView(false)
                checkPatientpresent().then(result=>{
                    if(result===true){
                        setView(false)
                        getPatient().then(result=>{
                            console.log("0 is ",result["0"])
                            setPatientName(result["0"])
                            setPatientAddress(result["1"])
                            setUniqueId(result["2"])
                        })
                    }else{
                        setView(true)
                    }
                })
            }else {
                setAdminView(true)
            }
        })

    })

    const getPatient=async ()=>{
        const {accounts,contract}=await webFunction();
        const result = await contract.methods.getPatient(accounts[0]).call({
            from:accounts[0]
        })
        console.log("patient is ",result["0"])
        return result

    }
    const logInHandler=async ()=>{
        const {accounts,contract}=await webFunction();
        const result = await contract.methods.loginPatient().send({
            from:accounts[0]
        })
        navigate("/home")

    }

  return (
    <>
    {adminView && 
        <div className='register'>
            <h1>Admin Account is NOt Created</h1>
            <AuthButton text="Craete Admin" clickHandler={()=>navigate("/")}></AuthButton>


        </div>}
        {
            view&&
            <div className='register'>
                <h1>Don't Have Account?</h1>
                <AuthButton text="SignUp Page" clickHandler={()=>navigate("/register")}></AuthButton>
    
    
            </div>
        }
        {
            !adminView && !view && 
            <div className='register'>
                <h1>Login AS Patient</h1>
            <TextField text={"Address"} textValue={patientAddress} onChangeHandler={()=>{}} ></TextField>
            <TextField textValue={patientName} text={"Name"} onChangeHandler={()=>{}}></TextField>
            <TextField text={"Unique id "} textValue={uniqueId} onChangeHandler={()=>{}}></TextField>
            <AuthButton text={"LOGIN"} clickHandler={logInHandler} widthG="100%" colorP='white'></AuthButton>
            </div> 
        }
    </>
  )
}

export default LoginPatient