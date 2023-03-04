import React, { useContext } from 'react'
import UserCard from './UserCard'
import './OnBoard.css'
import { AppContext } from '../../App'
import MyPdf from '../../MyPdf'
import { useNavigate } from 'react-router-dom'

const OnBoard = () => {
  const navigate=useNavigate();
  
  return (
   <> <div className='cards'>
        <UserCard text={"ADMIN"} borderColor={"rgb(52, 235, 155)"}></UserCard>
        <UserCard text={"DOCTOR"}></UserCard>
        <UserCard text={"PATIENT"} borderColor={"rgb(235, 52, 131)"}></UserCard>
    </div>
   

    </>
  )
}

export default OnBoard