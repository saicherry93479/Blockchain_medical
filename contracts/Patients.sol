// pragma solidity >=0.7.0 <0.9.0;
pragma solidity ^0.8.17;

contract Patient {
    string  name;
    address patientAddress;
    uint uinqueId;
    string[] records;
    bool isLoggedIn;



    function getName() public view returns(string memory){
        return name;
    }
    function getAddress() public view returns(address) {
        return patientAddress;
    }
    function getUniqueId()public view returns(uint) {
        return uinqueId;
        
    }
    function getRecords() public view returns(string[] memory){
        return records;
    }
    
    mapping(uint=>address) recordGivenBy;

    function registerPatient(string memory _name,uint _uniqueId,address _addr) public{
        name=_name;
        patientAddress=_addr;
        uinqueId=_uniqueId;
    }
    function login() public {
        isLoggedIn=true;
    }

    function addRecord(string memory uid) public {
        records.push(uid);
    }





    


}