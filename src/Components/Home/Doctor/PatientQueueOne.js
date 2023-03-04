import { create} from 'ipfs-http-client'
import React, { useEffect, useState } from 'react'
import LeftArrow from '../../../Images/LeftArrow'
import { webFunction } from '../../../Utils/ContractUtil'
import { createUniqueString } from '../../../Utils/RandomeUnique'
import DrugAdd from './DrugAdd'
import './PatientQueueOne.css'
import { ThirdwebStorage } from "@thirdweb-dev/storage";

// First, instantiate the SDK
const storage = new ThirdwebStorage();

// import * as buffer from "buffer";
// window.Buffer = buffer.Buffer;

// const projectId = "2KiyG1MBUts4FkHp7VpHbBC2Tcl";

// const projectSecret = "36e6eacf54580eda1a2f998e264d4af6";

// const auth =
//   "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

// console.log("auth is ",auth)

// export const client = create({
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https",
//   headers: {
//     authorization: auth,
//   },
// });

const PatientQueueOne = ({patientAddress,doctorAddresses,doctorName,setRefresh,setTotalView}) => {
    const [patientName,setPatientName]=useState("")
    const [patientAddres,setPatientAddres]=useState("")
    const [patientUniqueId,setPatientUniqueId]=useState("")
    const [records,setRecords]=useState([])
    const [file,setFile]=useState(null);
    const [drugOne,setDrugOne]=useState("")
    const [drugTwo,setDrugTwo]=useState("")
    const [daysOne,setDaysOne]=useState("")
    const [perDayOne,setPerDayOne]=useState("")
    const [daysTwo,setDaysTwo]=useState("")
    const [drugCount,setDrugCount]=useState(0)
    const [error,setError]=useState(false)
    const [perDayTwo,setPerDayTwo]=useState("")
    // const [ipfsHash,setIpfsHash]=useState(null)
    const [errorMessage,setErrorMessage]=useState("")
    // const [uniqueId,setUniqueId]=useState(null)

    const [recordView,setRecordView]=useState(false)


    useEffect(()=>{
        getPatient().then(result=>{
            setPatientName(result["0"])
            setPatientAddres(result["1"])
            setPatientUniqueId(result["2"])
            setRecords(result["3"])

        })


    },[])
   
    const getPatient=async ()=>{
        console.log("in get patient ")
        console.log("patient address is ",patientAddress)
        try{
            const {accounts,contract}=await webFunction();
            const results=await contract.methods.getPatient(patientAddress).call({
                from:accounts[0]
            })
            console.log("results ",results)
            return results
        }catch(err){
            console.log("in gettingPatient");
            console.log("error is ",err)
        }

    }

    const recordViewHandler=()=>{
        setRecordView(true)
    }
    const clickHandler=()=>{
        setFile(null);

    }

    const addMoreHandler=()=>{
        if(drugCount<2){
            setDrugCount(p=>p+1);
        }
    }
    const removeHandler=()=>{

        if(drugCount>0){
            setDrugCount(p=>p-1);
        }

    }
    const cancelViewHandler=()=>{
        setRecordView(false)
        setFile(null)
        setDrugCount(0)
        setDrugOne("")
        setDaysOne("")
        setDrugTwo("")
        setDaysTwo("")
        setError(false)
        setErrorMessage("")
    }

    const uploadHandler= async ()=>{
        
        setError(false)
        setErrorMessage("")
        console.log("in upload handler")
        // console.log("client in ipfs ",client)

        var medics=[]
        
        if(file===null){
            setError(true)
            setErrorMessage("please upload report")
            return
        }
        
        if(drugCount>-1 && (drugOne.length===0 || daysOne.length===0 ||perDayOne.length===0)){
            setError(true)
            setErrorMessage("Please Uplaod Drug One");
            return
        }
        medics.push(drugOne+"-"+daysOne+"-"+perDayOne)
        
        if(drugCount >0 && (drugTwo.length===0 || daysTwo.length===0||perDayTwo.length===0)){
            setError(true)
            setErrorMessage("plase upload Drug Two");
            return
        }
        if(drugCount>0){
            medics.push(drugTwo+"-"+daysTwo+"-"+perDayTwo)
        }
        var uniqueId=createUniqueString()
        // =[drugOne+"-"+daysOne,drugTwo+"-"+daysTwo]
        console.log("here uniqueid ",uniqueId," medics ",medics)
        try {
            console.log("in ipfs ");
            console.log("file is ",file)
            // We define metadata for an NFT
         
            // Here we get the IPFS URI of where our metadata has been uploaded
            const uri = await storage.upload(file);
            // This will log a URL like ipfs://QmWgbcjKWCXhaLzMz4gNBxQpAHktQK6MkLvBkKXbsoWEEy/0
            console.log("here in thirdweb storage in ",uri);
            const url = await storage.resolveScheme(uri);
            // This will log a URL like https://gateway.ipfscdn.io/ipfs/QmWgbcjKWCXhaLzMz4gNBxQpAHktQK6MkLvBkKXbsoWEEy/0
            console.log("url  ---",url);
            const res = await storage.download(uri);
            console.log("download is ",res)
       
            // setIpfsHash(uri);
            var ipfsHash=uri
            try{
                console.log("uniqueId ",uniqueId)
                console.log("hash ",ipfsHash)
                console.log("medics ",medics)
                console.log("doctaddr ",doctorAddresses," doctor name ",doctorName)
                console.log("patient addres ",patientAddres," patient name ",patientName)
                if(uniqueId.length==0 || ipfsHash.length==0 || medics.length==0 || doctorAddresses.length==0 || patientAddres.length==0 || doctorName.length===0 || patientName.length===0){
                    setError(true)
                    setErrorMessage("there is an error in uploading")
                }
                const {accounts,contract}=await webFunction();
                const result=await contract.methods.addRecord(uniqueId,ipfsHash,medics,doctorAddresses,patientAddres,patientName,doctorName).send({
                    from:accounts[0],

                });
                setRefresh(p=>!p)
                setTotalView(true)
                console.log("result in addidng record ")
                console.log(result)

            }catch(Exx){

                console.log("error in record uploading ")
                console.log(Exx)
                setError(true)
                setErrorMessage("error ")
            }

        }catch(exe){
            console.log("error in uploading to infura ipfs");
            console.log("error is ",exe)
            setError(true)
            setErrorMessage("can't upload file");
            return
        }


    }
    
    

  return (
<div>
    <div className='leftBackButton'>
        <LeftArrow></LeftArrow>
        
        
    </div>
    <div>
    <div className='patientDetailsBox patientBoxOne'>
        <p className='p1'>Name</p>
        <p className='p2'>Address</p>
        <p className='p3'>UniqueId</p>
        <p className='p4'>Records</p>
    </div>
    <div className='patientDetailsBox'>
    
    <p className='p1'>{patientName}</p>
    <p className='p2'>{patientAddres}</p>
    <p className='p3'>{patientUniqueId}</p>
    <p className='p4'>{records.length}</p>
    </div>
    </div>

    <div className='uploadClass'>

        {file && 
        <div className='inputButton' onClick={uploadHandler}>
            <p>Upload</p>
        </div>}

        {
            recordView?<div onClick={cancelViewHandler} style={{backgroundColor:"crimson"}} className="inputButton">
                <p>Cancel</p>
            </div>:<div onClick={recordViewHandler} className="inputButton">
                <p>Add a Record</p>
            </div>
        }
       
    
    </div>
    <p className='recordError'>{error?errorMessage:''}</p>
    {
        recordView?
        <div>
            <p className='recordInputHaeder'>Upload A Report</p>
            <div className="inputButtonDiv">
                <p>{file?file.name:"Select A File"}</p>
                {
                    file?<div className='inputButton' style={{backgroundColor:"crimson"}} onClick={clickHandler}>Cancel</div>:<label for="inputTag" className='inputButton'>
                    Select 
                    
                   
                    <input id="inputTag" type="file" onChange={(e)=>setFile(e.target.files[0])}/>
                    <br/>
                    
                </label>
                }
            </div>
            {
                file?<div>
                    <p className='recordInputHaeder'>Add Prescription</p>
                    <div className='drugHeaders'>
                        <p>Name</p>
                        <p>Days</p>
                        <p>Per Day</p>
                    </div>
                    {
                         drugCount>-1&&<DrugAdd setDrug={setDrugOne} setDays={setDaysOne} setPerDay={setPerDayOne} perDay={perDayOne} drugCount={drugCount} drug={drugOne} days={daysOne} show={false}></DrugAdd>
                    
                    }
                    {
                        drugCount>0 && <DrugAdd setDrug={setDrugTwo} setDays={setDaysTwo} setPerDay={setPerDayTwo} perDay={perDayTwo} drugCount={drugCount} drug={drugTwo} days={daysTwo} show={true} clickHandler={removeHandler}></DrugAdd>
                    }
                 
                    {
                        drugCount<1 && 
                        <div className='inputButton' onClick={addMoreHandler}>
                            <p>Add</p>
                        </div>
                    }

                </div>:<></>
            }
        </div>:<></>
    }

    
</div>
  )
}

export default PatientQueueOne