
import { webFunction } from "../../Utils/ContractUtil"

export const checkAdminPresent=async ()=>{
    console.log("#### checkAdmin Present method ####")
    try{
    const {accounts,contract}=await webFunction();
    console.log("acount is ",accounts[0])
    const result = await contract.methods.isAdminCreated().call({
        from: accounts[0],
      });
      console.log("rsult is ",result)
      return result
    }catch(error){
        console.log("error in transcation doing")
        console.log("error is ",error)
        return false
    }

}

export const getAdminDetails=async ()=>{
    console.log("#### in gerring admin details ####");
    try{
        const {accounts,contract}=await webFunction();
        console.log("acount is ",accounts[0])
        const result = await contract.methods.getAdmin().call({
            from: accounts[0],
          });
          console.log("rsult is ",result)
          return result
        }catch(error){
            console.log("error in transcation doing")
            console.log("error is ",error)
            return "not fetched admin details"
        }

}

export const checkDoctorPresent=async ()=>{
    try{
        const {accounts,contract}=await webFunction();
        console.log("acount is ",accounts[0])
        const result = await contract.methods.isDoctorRegisterd().call({
            from: accounts[0],
          });
          console.log("rsult is ",result)
          return result
        }catch(error){
            console.log("error in transcation doing")
            console.log("error is ",error)
            return false
        }

}

export const checkPatientpresent=async ()=>{
    try{
        const {accounts,contract}=await webFunction();
        // console.log("acount is ",accounts[0])
        const result = await contract.methods.isPatientRegistered().call({
            from: accounts[0],
          });
        //   console.log("rsult is ",result)
          return result
        }catch(error){
            console.log("error in transcation doing")
            console.log("error is ",error)
            return false
        }

}
