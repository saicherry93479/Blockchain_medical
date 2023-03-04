pragma solidity ^0.8.17;
import "./Records.sol";
import "./Doctors.sol";
import "./Patients.sol";

contract Util{
    mapping(string=>Record) uniqueToRecord;

    function addRecord(string memory _uniqueId,string memory _reportHash,string[] memory _medicens,address _issuedBy,address _issuedTo,string memory _patientName,string memory _doctorName,Doctor d,Patient p) public{
            Record r=new Record();
            r.addRecord(_uniqueId, _reportHash, _medicens, _issuedBy, _issuedTo, _patientName, _doctorName);
            uniqueToRecord[_uniqueId]=r;
            d.addRecord(_uniqueId);
            d.removePatientRequested(_issuedTo);
            p.addRecord(_uniqueId);
            // doctorAddressToRecords[_doctorAddress].push(_uniqueId);
            // patientAddressRecords[_patientAddress].push(_uniqueId);

    }
    function getRecord(string memory _uniqueId) public view returns(string memory,string memory,string[] memory,address,address,string memory,string memory){
        Record r=uniqueToRecord[_uniqueId];
        return (r.getUniqueId(),r.getReportHash(),r.getMedices(),r.getIssuedBy(),r.getIssuedTo(),r.getPatientName(),r.getDoctorName());
    }
}