import React, { createContext, useState } from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom/dist';

import CheckMetaMask from './Components/Auth/CheckMetaMask';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Home from './Components/Home/Home';
import Calender from './Components/Home/Patient/Calender';
import Normal from './Components/Normal'
import OnBoard from './Components/OnBoard/OnBoard';
import GoogleCalendar from './GoogleCalendar';
import MyPdf from './MyPdf';




export const AppContext = createContext();
const App = () => {
  const [metaMaskInstall, setMetaMaskInstall] = useState(false);
  const [metaMaskConnect, setMetaMaskConnect] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [address, setAddress] = useState("");
  const [currentId,setCurrentId]=useState(null)
  const [user,setUser]=useState({})
  const [refreshAdmin,setRefreshAdmin]=useState(false)
  return (
    <AppContext.Provider
      value={{
        metaMaskConnect,
        setMetaMaskConnect,
        metaMaskInstall,
        setMetaMaskInstall,
        setRegisterName,
        address,
        setAddress,
        registerName,
        currentId,setCurrentId,
        user,
        setUser,
        refreshAdmin,
        setRefreshAdmin

      }}
    >
      <Router>
        <Routes>
          <Route path='/' element={<OnBoard></OnBoard>}></Route>
          <Route path='/metamask' element={<CheckMetaMask></CheckMetaMask>}></Route>
          <Route path='/register' element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path='/home' element={<Home></Home>}></Route>
          

        </Routes>
      </Router>
    
    </AppContext.Provider>
  )
}

export default App