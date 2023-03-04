import { gapi } from 'gapi-script'
import React, { useEffect, useState } from 'react'

const ShowMedicine = ({dataStr}) => {
    const [name,setName]=useState("")
    const [days,setDays]=useState("")
    const [perDay,setPerDay]=useState("")
    const eventAdd = {
      'summary': "Hello World",
      'description': `Your medicines are going to expire in 1 day, please get to the nearest medical shop to get some more. please click on this link to go to maps : https://www.google.com/maps/search/medical+shops+near+me/`,
   
      'start': {
        'dateTime': "2023-01-28T09:00:00-07:00",
        'timeZone': 'Asia/Kolkata',
      },
      end: {
        dateTime: "2023-01-30T17:00:00-07:00",
        timeZone: 'Asia/Kolkata',
      },
      // recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
      // attendees: [],
      // reminders: {
      //   useDefault: false,
      //   overrides: [
      //     { method: "email", minutes: 24 * 60 },
      //     { method: "popup", minutes: 10 },
      //   ],
      // },
    };
    
    const accessToken='4/0AWtgzh5NTeIkcBSnAAn9RzkOvkQMZfs6O-dGgRxTXn55L3Y_0CnhkXrq61mUZDC1iLyi_A'
    useEffect(()=>{
        console.log("dataStr is ",dataStr)
        const da=dataStr.split("-")
        console.log(`name ${da[0]} day ${da[1]} perDay ${da[2]}`)
        setName(da[0])
        setDays(da[1])
        setPerDay(da[2])
        // console.log("in show medicine working ",dateTimeForCalander(10))
        // const dateTime=dateTimeForCalander(10);
        // console.log("dateTime is ",dateTime)
      try{
        addEvent('123003253@sastra.ac.in',eventAdd)
      }catch(err){
        console.log("err is ",err)
      }
      console.log(getEvents('123003253@sastra.ac.in'))
    },[])

    const getEvents = (calendarID) => {
    
      function initiate() {
        gapi.client
          .init({
            apiKey: 'AIzaSyAb5JBKRP5e_2PenwoEE1wFFLw67tBIHUE',
          })
    
          .then(function () {
            return gapi.client.request({
              path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
            });
          })
    
          .then(
            (response) => {
              let events = response.result.items;
              console.log("events are ",events)
              return events;
            },
            function (err) {
              return [false, err];
            }
          );
      }
    
      gapi.load("client", initiate);
    
    };

    const addEvent = (calendarID, event) => {
      function initiate() {
        gapi.client
          .request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
            method: "POST",
            body: event,
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer 4/0AWtgzh5NTeIkcBSnAAn9RzkOvkQMZfs6O-dGgRxTXn55L3Y_0CnhkXrq61mUZDC1iLyi_A`,
            },
          })
          .then(
            (response) => {
              return [true, response];
            },
            function (err) {
              console.log(err);
              return [false, err];
            }
          );
      }
      gapi.load("client", initiate);
    };
  return (
    <div className='medicineTable'>
        <p>{name}</p>
        <p>{days}</p>
        <p>{perDay}</p>
    </div>
  )
}

export default ShowMedicine