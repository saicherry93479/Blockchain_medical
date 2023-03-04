import React, { useEffect } from 'react'
import { webFunction } from '../Utils/ContractUtil'
import CheckMetaMask from './Auth/CheckMetaMask'

const Normal = () => {
    useEffect(()=>{

       

    },[])
    var check=async ()=>{
        const { contract, accounts } = await webFunction();
        console.log(accounts);
        console.log(accounts)
    }
    
  return (
    <div>
        <button onClick={()=>check()}></button>
        <CheckMetaMask></CheckMetaMask>
    </div>
  )
}

export default Normal