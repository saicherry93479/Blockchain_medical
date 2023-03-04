import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { webFunction } from '../../Utils/ContractUtil';
import AuthButton from './AuthButton'
import TextField from './TextField'
import { checkAdminPresent, getAdminDetails } from './Utils';

const LoginAdmin = () => {
   
    const navigate=useNavigate();
    const {address,setUser,setAddress,refreshAdmin}=useContext(AppContext);
    
    const [error,setError]=useState(false)
    const [view,setView]=useState(false)
    const [adminAddress,setAdminAddress]=useState(null)
    const [name,setName]=useState(null)

    const [secondView,setSecondView]=useState(false)



    

   
    useEffect(()=>{
        // updateAddress().then((result)=>{
        //     console.log("updated address is ",address);
        // })
        
        
      checkAdminPresent().then(result=>{
        if(result===true){
            setView(false)
            getAdminDetails().then(result=>{
                console.log("result is ",result)
                setUser(result)
                setAdminAddress(result["1"])
                setName(result["0"])
                setAddress(result["1"])

            })


        }else{
            setView(true)
        }
      })
   
    },[refreshAdmin])

    // const updateAddress=async ()=>{
    //     console.log("in update address ")
    //     const {accounts,contract}=await webFunction();
    //     console.log("accounts are in update address ",accounts)
    //     setAddress(accounts[0])
    //     setAdminAddress(accounts[0])
    // }

   

    const updateUser=async ()=>{
        
    }
    const logInHandler=async ()=>{
        const {accounts,contract}=await webFunction();
        const result = await contract.methods.loginAdmin().send({
            from:accounts[0]
        })
        navigate("/home")
        
    }
    const viewHandler=()=>{
        navigate("/register")

    }
  return (
    <>
    {

    view?
        <div className='register'>
            <h1>Don't Have Account?</h1>
            <AuthButton text="SignUp Page" clickHandler={viewHandler}></AuthButton>


        </div>:<div className='register'>
            <h1>Login AS ADMIN</h1>
            <TextField text={"Address"} textValue={adminAddress} onChangeHandler={()=>{}} ></TextField>
            <TextField textValue={name} text={"Name"} onChangeHandler={()=>{}}></TextField>
            {error?<p className='errorP'>Error while Loging.Please,Try Again.</p>:<></>}
            <AuthButton text={"LOGIN"} clickHandler={logInHandler} widthG="100%" colorP='white'></AuthButton>

        </div>}</>
  )
}

export default LoginAdmin