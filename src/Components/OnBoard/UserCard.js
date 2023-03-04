
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom/dist';
import { AppContext } from '../../App';

import './UserCard.css'
const UserCard = ({text,borderColor='rgb(235, 192, 52)'}) => {
  const {setCurrentId,currentId}=useContext(AppContext);

    const navigate=useNavigate();
const clickHandler=()=>{
    navigate("/metamask")
    setCurrentId(text==="ADMIN"?0:text==="DOCTOR"?1:2);

}
  return (
    <div className='userCard' style={{borderTop:`8px solid ${borderColor}`}} onClick={()=>clickHandler()}>
        <h1>{text}</h1>
        <p>LOGIN AS {text}</p>

        <div className='userCardButton'>
            <p className='userCardButtonP'>CONNECT</p>
        </div>

    </div>
  )
}

export default UserCard