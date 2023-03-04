pragma solidity ^0.8.17;
// pragma solidity >=0.7.0 <0.9.0;


pragma solidity >=0.7.0 <0.9.0;

contract Doctor{
    string public  name;
    address  public doctorAddress;
    uint public  uniqueId;
    bool public  isLoggedIn=false;
    address[] public patientsTreated;
    string[] public recordsIssued;
    address[] public patientsRequested;

    mapping(address=>uint) requestedAddToIndex;

    mapping(address=>bool) patientRequestedPresent;

  

   
    mapping(address=>uint[]) patientToRecords;

    function getName() public view returns(string memory){
        return name;

    }
    function getDoctorAddress() public view returns(address ){
        return doctorAddress;
    }
    function getUniqueid() public view returns(uint){
        return uniqueId;
    }
    function getPatientsTreated() public view returns(address[] memory) {
        return patientsTreated;
        
    }
    function getPatientsRequested() public view returns(address[] memory){
        return patientsRequested;
    }
    function getRecordsIssues() public view returns(string[] memory){
        return recordsIssued;
    }
    function addPatientRequested(address _add) public {
        patientRequestedPresent[_add]=true;
        requestedAddToIndex[_add]=patientsRequested.length;
        patientsRequested.push(_add);
        
    }
    function getPatientRequestedPreset(address _addr) public view returns(bool) {
        return patientRequestedPresent[_addr];
        
    }

    function removePatientRequested(address _aadd) public {
        patientRequestedPresent[_aadd]=false;
        uint index=requestedAddToIndex[_aadd];
        // delete patientsRequested[index];
        require(index < patientsRequested.length);
        patientsRequested[index] = patientsRequested[patientsRequested.length-1];
        patientsRequested.pop();

    }
    

    function registerDoctor(string memory _name,uint id,address _addr) public {
        name=_name;
        doctorAddress=_addr;
        uniqueId=id;

    }
    function login() public {
        isLoggedIn=true;

    }
    function getDoctor() public view returns(string memory,address,uint ) {
        return (name,doctorAddress,uniqueId);
        
    }
    function addRecord(string memory uid) public{
        recordsIssued.push(uid);
    }
    

    // function getDoctor() public view returns(string memory ,address,uint,address[] memory,uint[] memory){
    //     // return (name,doctorAddress,uniqueId,patientsTreated,patientToRecords);
        
    //     return (name,doctorAddress,uniqueId,patientsTreated,patientToRecords);
    // }
    






}