import React, { useEffect, useState } from 'react'
import { AddToCalendarButton } from 'add-to-calendar-button-react';

const Calender = ({days=10}) => {
  const [dat,setDate]=useState('')
  useEffect(()=>{
    console.log("days are ",days)
    let date=new Date();
    let year=date.getFullYear()
    let dates=date.getDate()
    let finalDate=dates+days;
    let month=date.getMonth()
    if(finalDate>30){
      month=month+ Math.ceil(finalDate/30)
      finalDate=finalDate%30;
    }
    if(finalDate<10){
        finalDate=`0${finalDate}`
    }
    if(month<10){
      month=`0${month}`
    }
    setDate(`${year}-${month}-${finalDate}`)
    console.log("date is ",dat)

    

  },[])

  return (
    <div>
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

{/* <AddtoCalendarButton
  name="Title"
  options=['Apple','Google']
  location="World Wide Web"
  startDate="2023-01-30"
  endDate="2023-01-30"
  startTime="10:15"
  endTime="23:30"
  timeZone="America/Los_Angeles"
>
  
</AddToCalendarButton> */}
    </div>
  )
}

export default Calender