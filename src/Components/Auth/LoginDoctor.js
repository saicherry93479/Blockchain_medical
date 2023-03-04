import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'
import { webFunction } from '../../Utils/ContractUtil'
import AuthButton from './AuthButton'
import TextField from './TextField'
import { checkAdminPresent, checkDoctorPresent } from './Utils'

const LoginDoctor = () => {
    const navigate=useNavigate();
    const {address}=useContext(AppContext);
    const [doctorAddress,setDoctorAddress]=useState("")  
    const [doctorName,setDoctorName]=useState("")
    const [uniqueId,setUniqueId]=useState("")
    const [adminView,setAdminView]=useState(false)
    const [view ,setView]=useState(false)

    useEffect(()=>{
        setDoctorAddress(address)
        checkAdminPresent().then(result=>{
            if(result===true){
                setAdminView(false)
                checkDoctorPresent().then(result=>{
                    if(result===true){
                        setView(false);
                        getDoctor().then(result=>{
                            setDoctorName(result["0"])
                            setUniqueId(result["2"])

                        })
                        
                    }else{
                        setView(true)
                    }

                })

            }else{
                setAdminView(true)
            }
        })

    })

    const getDoctor=async ()=>{
        const {accounts,contract}=await webFunction();
        const result = await contract.methods.getDoctor().call({
            from:accounts[0]
        })
        console.log("doctor is ",result)
        return result

    }

    const logInHandler=async ()=>{
        const {accounts,contract}=await webFunction();
        const result = await contract.methods.loginDoctor().send({
            from:accounts[0]
        })
        navigate("/home")

    }
    const viewHandler=()=>{
        navigate("/register")

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
                <AuthButton text="SignUp Page" clickHandler={viewHandler}></AuthButton>
    
    
            </div>
        }
        {
            !adminView && !view && 
            <div className='register'>
                <h1>Login AS Doctor</h1>
            <TextField text={"Address"} textValue={doctorAddress} onChangeHandler={()=>{}} ></TextField>
            <TextField textValue={doctorName} text={"Name"} onChangeHandler={()=>{}}></TextField>
            <TextField text={"Unique id "} textValue={uniqueId} onChangeHandler={()=>{}}></TextField>
            <AuthButton text={"LOGIN"} clickHandler={logInHandler} widthG="100%" colorP='white'></AuthButton>
            </div> 
        }

        </>
    
    
  )
}

export default LoginDoctor