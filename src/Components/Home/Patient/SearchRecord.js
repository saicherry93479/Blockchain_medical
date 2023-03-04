import React, { useContext, useEffect, useState } from 'react'
import { webFunction } from '../../../Utils/ContractUtil'
import { PatientContext } from './PatientHome'
import { descriptionSample, manfracturer, manfracturerSample, searchRecordsUpdate } from './SampleData'
import './SearchRecord.css'



const SearchRecord = ({patientRecords}) => {
    const [data,setData]=useState([])
    const [input,setInput]=useState('')
    const [error,settError]=useState(false);
    // const [refresh,setRefresh]=useState(false)
   
    useEffect(()=>{
        
        

    })
  
    const clickHandler=async ()=>{
        // setRefresh(p=>!p)
        settError(false)
        setData([])
        
        console.log("input is ",input)
        if(input.length<8 ){
            settError(true)
            return
        }
        if(patientRecords.includes(input)===false){
            settError(true)
            return
        }
        const data=await recordData(input);
        setData(searchRecordsUpdate(data["2"],input))
        
        // console.log('names are ',names)
        // setShow(true)
        

    }
 
    const recordData=async (uid)=>{
        const {accounts,contract}=await webFunction();
        const result=await contract.methods.getRecord(uid).call(
          {
            from :accounts[0]
          }
        )
        console.log(`record result for ${uid} is ${result}`)
        return result
    
      }

  return (
    <div>
        <div className='searchTop'> 
            <input type={'text'} value={input} onChange={(e)=>setInput(e.target.value)}></input>
            <div className='searchButton' onClick={clickHandler}><p>Search</p></div>
        </div>
        <p className='searchError'>{error?"error in input":""}</p>

        <div className='searchTable'>
            {
                data.length>0 && <div className='searchRow extraRow'>
                    <p>Medicine</p>
                    <p>manfracturer</p>
                    <p>Description</p>
                    <p>Price</p>
                </div>
            }
             {
            data.map((dat,index)=><div className='searchRow'>
                <p>{dat[0]}</p>
                <p>{dat[1]}</p>
                <p>{dat[2]}</p>
                <p>{dat[3]}</p>
            </div>)
        }
        </div>
        

       
        
    </div>
  )
}

export default SearchRecord