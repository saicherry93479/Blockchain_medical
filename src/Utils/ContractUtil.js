import Web3 from "web3";
import OverAll from "../contracts/Admin.json";
import OverAllTwo from "../contracts/Doctor.json"
export const webFunction = async () => {
  // console.log("#### in web funcgtion ####")
  const web3 = new Web3(window.ethereum);

  const accounts = await web3.eth.getAccounts();
  // console.log("accounts are ",accounts)
  const networkId = await web3.eth.net.getId();
  // console.log("network id is ",networkId)
  const networkData = OverAll.networks[networkId];
  // console.log("network data is ",networkData)
  if (networkData) {
    // console.log("came in")
    const abi = OverAll.abi;
    const conAddress = networkData.address;
    const contract = new web3.eth.Contract(abi, conAddress);
    return { contract, accounts };
  }
  // console.log("no not")
};
export const webFunctionTwo = async () => {
  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  const networkId = await web3.eth.net.getId();
  const networkData = OverAllTwo.networks[networkId];
  if (networkData) {
    const abi = OverAll.abi;
    const conAddress = networkData.address;
    const contract = new web3.eth.Contract(abi, conAddress);
    return { contract, accounts };
  }
};