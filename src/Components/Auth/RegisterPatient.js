import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { webFunction } from '../../Utils/ContractUtil';
import AuthButton from './AuthButton';
import TextField from './TextField';

const RegisterPatient = () => {
    const navigate=useNavigate();

    const {address}=useContext(AppContext)

    const [patientAddress,setPatientAddress]=useState("")
    const [name,setName]=useState("")
    const [uniqueId,setUniqueId]=useState('')
    const [error,setError]=useState(false)

    useEffect(()=>{
        setPatientAddress(address)
    },[])
    const clickHandler=async ()=>{
        if(name.length===0 || name.length<6 || uniqueId.length===0){
            setError(true)
            return
        }
        var uId;
        try{
            uId=parseInt(uniqueId)
            setError(false)
        }catch(e){
            setError(true)
            return
        }
        setError(false)
        try{
            const {accounts,contract}=await webFunction();
            const result = await contract.methods.checkPatientUniqueIdPresent(uId).call({
                from: address,
              });
              if(result===true){
                try{
                    const result=await contract.methods.registerPatient(name,uId).send({
                        from: address,
                    })
                    console.log(result)
                    navigate("/login")

                }catch(eee){
                    setError(true)
                    return

                }

              }else{
                setError(true)
                return
              }

        }catch(err){
            setError(true)
            return
        }


    }

   
  return (
  
    <>
     <TextField text={"Address"} textValue={patientAddress} onChangeHandler={()=>{}} ></TextField>
    <TextField text={"Name"} textValue={name} onChangeHandler={(e)=>setName(e.target.value)} ></TextField>
    <TextField text={"UniqueId"} textValue={uniqueId} onChangeHandler={(e)=>setUniqueId(e.target.value)}></TextField>
    {error?<p className='errorP'>Error while Registering.Please,Try Again.</p>:<></>}
    <AuthButton text={"REGISTER"} clickHandler={clickHandler} widthG="100%" colorP='white'></AuthButton>
    </>
  )
}

export default RegisterPatient