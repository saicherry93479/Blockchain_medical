import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import { AppContext } from '../../App';
import MetaMask from "../../Images/MetaMas.png";
import './CheckMetaMask.css'

const CheckMetaMask = () => {
  const navigate=useNavigate();
    useEffect(() => {
        checkMetaMask();
      }, []);
      const {
        setMetaMaskInstall,
        metaMaskInstall,
        metaMaskConnect,
        setMetaMaskConnect,
      } = useContext(AppContext);
    
      const checkMetaMaskConnect = async () => {
       
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        console.log("account is ",accounts)
        if (accounts.length > 0) {
          setMetaMaskConnect(true);
        } else {
          setMetaMaskConnect(false);
        }
      };
    
      const checkMetaMask = () => {
        if (window.ethereum) {
          console.log("MetaMask is installed");
          setMetaMaskInstall(true);
          checkMetaMaskConnect();
        } else {
          setMetaMaskInstall(false);
          console.log("Please install MetaMask");
        }
      };
    
      const nextHandler = () => {
        // setCurrent(1);
        navigate("/login");
        
      };
    
      const connectWallet = async () => {
        console.log("connectWallet");
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setMetaMaskConnect(true);
        console.log("MetaMask is connected");
      };
    
      return (
      <div className='metaMask'>
        <div className="userCard metaMaskCard">
          <h1>Connect Meta Mask</h1>
          <img src={MetaMask} className="metaMaskImage"></img>
          {metaMaskInstall ? (
            <>
              <p>MetaMask Available </p>
              {metaMaskInstall && !metaMaskConnect ? (
                <button className="metaMaskButton" onClick={connectWallet}>
                  <p > CONNECT TO METAMASK</p>
                </button>
              ) : (
                <button className="metaMaskButton" onClick={nextHandler}>
                  <p>NEXT</p>
                </button>
              )}
            </>
          ) : (
            <p>Please install MetaMask</p>
          )}
        </div>
        </div>
      );
}

export default CheckMetaMask