// pragma solidity >=0.7.0 <0.9.0;
pragma solidity ^0.8.17;


contract Record{
    
    string public uniqueId;
    string public reportHash;
    string[] public medicens;
    address public issuedBy;
    address public issuedTo;
    string public patientNae;
    string public doctorName;
    


   

    function getPatientName() public view returns(string memory) {
        return patientNae;
    }
    function getDoctorName() public view returns(string memory) {
        return doctorName;
    }
    function getUniqueId() public view returns(string memory) {
        return uniqueId;
        
    }
    function getReportHash() public view returns(string memory){
        return reportHash;
    }
    function getIssuedBy() public view returns(address) {
        return issuedBy;  
    }
    function getMedices() public view returns(string[] memory){
        return medicens;
    }
    function getIssuedTo() public view returns(address){
        return issuedTo;
    }
    function addRecord(string memory _uniqueId,string memory _reportHash,string[] memory _medicens,address _issuedBy,address _issuedTo,string memory _patientName,string memory _doctorName) public{
        uniqueId=_uniqueId;
        patientNae=_patientName;
        reportHash=_reportHash;
        medicens=_medicens;
        issuedBy=_issuedBy;
        issuedTo=_issuedTo;
        doctorName=_doctorName;
       

    }
    
}
