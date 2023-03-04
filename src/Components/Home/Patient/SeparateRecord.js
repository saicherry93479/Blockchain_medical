import React, { useContext, useEffect, useState } from 'react'
import LeftArrow from '../../../Images/LeftArrow'
import { webFunction } from '../../../Utils/ContractUtil'
import './SeparateRecord.css'
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { saveAs } from 'file-saver';
import ShowMedicine from './ShowMedicine';
import QRCode from 'react-qr-code';
import { PatientContext } from './PatientHome';
import Calender from './Calender';
const storage = new ThirdwebStorage();
const SeparateRecord = ({setView,recordId}) => {
   
    const [data,setData]=useState([])
    const [url,setUrl]=useState('')
    const [dayS,setDaysS]=useState(10)
   

    useEffect(()=>{
        getData().then(result=>{
            console.log("result is ",result)
            setData(result)
        })

       
        
    },[])
    useEffect(()=>{
      getUrl().then(result=>{
        console.log("result is in url  ",result)
        setUrl(result)
      },)
      
    },[data])
    useEffect(()=>{
      setDaysS(data.length>0?data[2][0].split('-')[1]:0);
    },[data])


   
    const backHandler=()=>{
        setView(false)
    }
    const getData=async ()=>{
        const {accounts,contract}=await webFunction();
        const result=await contract.methods.getRecord(recordId).call(
          {
            from :accounts[0]
          }
        )
        console.log(`record result for ${recordId} is ${result}`)
        return result

    }
    
    const getUrl=async ()=>{
      const value=storage.resolveScheme(data["1"])
      console.log("url is ",value)
      return value
    }
  return (
    <div>
        <div className='leftBackButton' onClick={backHandler}>
        <LeftArrow></LeftArrow>
        </div>
        {/* <p>data is {data['2'].length}</p> */}
        <div className='doctorDetails'>
              <div className='doctorItem extraItem'>
                  <p className='t1'>Issued By</p>
                
                  <p className='t3'>Doctor Address</p>
                  {/* <p className='t4'>Medicines</p> */}
                  <p className='t5'>Report</p>
                
            </div>
          <div className='doctorItem extraItem'>
            <p className='t1' style={{fontSize:"16px",color:"black",fontWeight:'400'}}>{data["6"]}</p>
          
            <p className='t3' style={{fontSize:"16px",color:"black",fontWeight:'400'}}>{data["3"]}</p>
            {/* <p className='t4'>{ data["2"].length}</p> */}
            {/* <div className='b5' onClick={clickHandler}>
              <p>Download</p>
            </div> */}
            <a  className="b5" href={url} target={"_blank"}>download</a>
   
            
          
      </div>

      
           
        </div>

        <div className='recordMedicine'>
          <div  className='recordLeft'>
            <div className='medicineTable extraTable'>
              <p>Medicine</p>
              <p>Days</p>
              <p>Per Day</p>
              <p>Add</p>
            </div>
            {
      
        data && Object.keys(data["2"]??{}).map((dat)=><div>
          
        <ShowMedicine dataStr={data["2"][`${dat}`]}></ShowMedicine>
        </div>
          )
      }
      
          </div>
        
        </div>
        <div className='extraLocation'>
          {/* <Calender days={dayS}></Calender> */}
          <QRCode
      size={256}
      style={{ height: "100px", maxWidth: "100%", width: "100px" }}
      // value={"sai charab"}
      value={recordId}
      viewBox={`0 0 256 256`}
      />
          <a className='loaction' target={'_blank'} href='https://www.google.com/maps/search/medical+shops+near+me/'>Medical Shops Near Me</a>

        </div>
 </div>
  )
}

export default SeparateRecord