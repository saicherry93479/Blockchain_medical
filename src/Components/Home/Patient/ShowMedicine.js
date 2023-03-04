import { AddToCalendarButton } from 'add-to-calendar-button-react';
import { gapi } from 'gapi-script'
import React, { useEffect, useState } from 'react'
import AddToCalendar from 'react-add-to-calendar';
import Calender from './Calender';


const ShowMedicine = ({dataStr}) => {
    const [name,setName]=useState("")
    const [days,setDays]=useState("")
    const [perDay,setPerDay]=useState("")

   
     useEffect(()=>{
        console.log("dataStr is ",dataStr)
        const da=dataStr.split("-")
        console.log(`name ${da[0]} day ${da[1]} perDay ${da[2]}`)
        setName(da[0])
        setDays(da[1])
        setPerDay(da[2])
        
    
    },[])
    const [dat,setDate]=useState('')
  useEffect(()=>{
    console.log("days are ",days)
    let date=new Date();
    let year=date.getFullYear()
    let dates=date.getDate()
    let finalDate=parseInt(dates)+parseInt(days);
    console.log("final date is ",finalDate,' date is ',dates)
    
    let month=date.getMonth()
    console.log("month is ",month)
    console.log("vaklue is ",finalDate/30)
    if(finalDate>30){
      month=month+ Math.floor(finalDate/30)


      finalDate=finalDate%30;
    }
    console.log("month and data after ",month,'  ',finalDate)
    if(parseInt(finalDate)<10){
        finalDate=`0${finalDate}`
    }
    month=parseInt(month)+1
    if(parseInt(month)<10){
      console.log('came here ')
      month='0'+month
    }
    console.log("values are ",month,' data ',finalDate)
    let st=year+'-'+month+'-'+finalDate
    console.log("st is ",st) 
    setDate(st)
    console.log("date is ##### ",dat)

    

  },[days])


 

  
  return (
    <div className='medicineTable'>
        <p>{name}</p>
        <p>{days}</p>
        <p>{perDay}</p>
        {/* <Calender days={days}></Calender> */}
        <AddToCalendarButton
      name='title'
      options={['Google']}
      location="world wide web"
      startDate={dat}
      endDate={dat}
      startTime="10:15"
      endTime='22:00'
      timeZone='Asia/Kolkata'
      ></AddToCalendarButton>
        
    </div>
  )
}

export default ShowMedicine