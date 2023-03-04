import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'
import { webFunction, webFunctionTwo } from '../../Utils/ContractUtil'
import AuthButton from './AuthButton'
import TextField from './TextField'

const RegisterDoctor = () => {
    const navigate=useNavigate();

    const {address}=useContext(AppContext)

    const [doctorAddress,setDoctorAddresses]=useState("")
    const [name,setName]=useState("")
    const [uniqueId,setUniqueId]=useState('')
    const [error,setError]=useState(false)
    const [doctorContract,setDoctorContract]=useState(null)

    useEffect(()=>{
        setDoctorAddresses(address)
        
    },[])
    
    // var getAddressContractUser=async ()=>{
    //     console.log("came")
    //     const {accounts,contract}=await webFunctionTwo();
    //     setAddres(accounts[0])
    //     setDoctorContract(contract)
    // }

    
    const clickHandler=async ()=>{
        if(name.length===0 || name.length<6 || uniqueId.length===0){
            console.log("in length")
            setError(true)
            return
        }
        var uId;
        try{
            uId=parseInt(uniqueId)

            setError(false)
        }catch(e){
            console.log("in parse ")
            setError(true)
            return
        }
        setError(false)
        try{
            const {accounts,contract}=await webFunction();
            const result = await contract.methods.checkDoctorUniqueIdPresent(uId).call({
                from: address,
              });
              if(result===true){
                try{
                    const result=await contract.methods.registerDoctor(name,uId).send({
                        from: address,
                    })
                    console.log(result)
                    navigate("/login")

                }catch(eee){
                    console.log("in transaction ",eee)
                    setError(true)
                    return

                }

              }else{
                console.log("unique id not oresnet ")
                setError(true)
                return
              }
        }
        catch(err){
            setError(true)
            return
        }


    }
  return (
    <>
      <TextField text={"Address"} textValue={address} onChangeHandler={()=>{}} ></TextField>
    <TextField text={"Name"} textValue={name} onChangeHandler={(e)=>setName(e.target.value)} ></TextField>
    <TextField text={"UniqueId"} textValue={uniqueId} onChangeHandler={(e)=>setUniqueId(e.target.value)}></TextField>
    {error?<p className='errorP'>Error while Registering.Please,Try Again.</p>:<></>}
    <AuthButton text={"REGISTER"} clickHandler={clickHandler} widthG="100%" colorP='white'></AuthButton>
    </>
  )
}

export default RegisterDoctor