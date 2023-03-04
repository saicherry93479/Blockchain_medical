// pragma solidity >=0.7.0 <0.9.0;
pragma solidity ^0.8.17;
import "./Doctors.sol";
import "./Patients.sol";
import "./Records.sol";
import "./Util.sol";
contract Admin{
    Util u=new Util();
    address public adminAddress;
    string public adminName;
    bool public isAdminPresent=false;
    uint[] public doctorIds;
    address[] public registeredDoctors;
    bool public isLoggedIn;
    uint[] patientIds;
    address[] patientAddress;
    
    mapping(uint=>bool) doctorUidPresent;
    mapping(uint=>bool) patientUidPresent;
    mapping(address=>bool) doctorPresent;

    mapping(address=>Doctor) addressToDoctor;

    mapping(address=>bool) patientPresent;

    mapping(address=>Patient) addressToPatient;
    struct doctorStruct{
        string name;
        address doctorAddress;
        uint id;
        string[] recordsIssued;
        address[] patientsTreated;
        bool appoint;
    }

    // mapping(string=>Record) uniqueToRecord;
    // mapping(address=>string[]) doctorAddressToRecords;
    // mapping(address=>string[]) patientAddressRecords;

    // struct recordStruct{
    //     string uniqueId;
    //     string reportHash;
    //     string[] medicnes;
    //     address issuedBy;
    //     address issuedTo;
    //     string patientName;
    //     string doctorName;
    //     address patientAddress;
    //     address doctorAddress;
    // }
    // struct patientStruct{
    //     string name;
    //     address patientAddress;
    //     uint id;
    //     string[] records;
    // }

   
    
    //get ALL PATIENTS
    // function getAllPatients() public view returns(patientStruct[] memory){
    //     patientStruct[] memory patients=new patientStruct[](patientAddress.length);
    //      for(uint i=0;i<patientAddress.length;i++){
    //         Patient p=addressToPatient[patientAddress[i]];
    //         patients[i]=patientStruct(p.getName(),p.getAddress(),p.getUniqueId(),p.getRecords());
    //     }
    //     return patients;
        
    // }
    function addRecord(string memory _uniqueId,string memory _reportHash,string[] memory _medicens,address _issuedBy,address _issuedTo,string memory _patientName,string memory _doctorName) public{

        // u.addRecord(_uniqueId, _reportHash, _medicens, _issuedBy, _issuedTo, _patientName, _doctorName,  addressToDoctor[_issuedBy], addressToPatient[_issuedTo]);
        u.addRecord(_uniqueId, _reportHash, _medicens, _issuedBy, _issuedTo, _patientName, _doctorName, addressToDoctor[_issuedBy], addressToPatient[_issuedTo]);
    }



    function getRecord(string memory _uniqueId) public view returns(string memory,string memory,string[] memory,address,address,string memory,string memory){
        return u.getRecord(_uniqueId);
        
        // return (r.getUniqueId(),r.getReportHash(),r.getMedices(),r.getIssuedBy(),r.getIssuedTo(),r.getPatientName(),r.getDoctorName(),r.getPatientAddress(),r.getDoctorAddress());
    }
    
  
    

    //ADD RECORD
    // function addRecord(string memory _uniqueId,string memory _reportHash,string[] memory _medicens,address _issuedBy,address _issuedTo,string memory _patientName,string memory _doctorName,address _patientAddress,address _doctorAddress) public{
    //         Record r=new Record();
    //         r.addRecord(_uniqueId, _reportHash, _medicens, _issuedBy, _issuedTo, _patientName, _doctorName,_patientAddress,_doctorAddress);
    //         uniqueToRecord[_uniqueId]=r;
    //         addressToDoctor[_doctorAddress].addRecord(_uniqueId);
    //         addressToDoctor[_doctorAddress].removePatientRequested(_patientAddress);
    //         addressToPatient[_patientAddress].addRecord(_uniqueId);
    //         // doctorAddressToRecords[_doctorAddress].push(_uniqueId);
    //         // patientAddressRecords[_patientAddress].push(_uniqueId);

    // }

    // function getDoctorRecords(address _doctorAddress) public view returns(recordStruct[] memory){
    //     string[] memory allRecords=doctorAddressToRecords[_doctorAddress];
    //     return getRecords(allRecords);
    // }
    // function getPatientRecords(address _patientAddress) public view returns(recordStruct[] memory){
    //     string[] memory allRecords=patientAddressRecords[_patientAddress];
    //     return getRecords(allRecords);
    // }
    // function getRecords(string[] memory allRecords) public view returns(recordStruct[] memory){
    //     recordStruct[] memory records=new recordStruct[](allRecords.length);
    //     for (uint i=0;i<allRecords.length;i++){
    //         Record r=uniqueToRecord[allRecords[i]];
    //         records[i]=recordStruct(r.getUniqueId(),r.getReportHash(),r.getMedices(),r.getIssuedBy(),r.getIssuedTo(),r.getPatientName(),r.getDoctorName(),r.getPatientAddress(),r.getDoctorAddress());
            

    //     }
    //     return records;
        
    // }

    

    //get patient 
    function getPatient(address _addr) public view returns(string memory,address,uint,string[] memory){
        Patient p=addressToPatient[_addr];
        return (p.getName(),p.getAddress(),p.getUniqueId(),p.getRecords());
    }


    // check for admin 
    function isAdminCreated() public view returns(bool){
        return isAdminPresent;
    }

    // register admin
    function registerAdmin(string memory name) public{
        isAdminPresent=true;
        adminAddress=msg.sender;
        adminName=name;
    }

    //function to get admin details 
    function getAdmin() public view returns(string memory,address,uint[] memory,uint[] memory,address[] memory,address[] memory){
        return (adminName,adminAddress,doctorIds,patientIds,registeredDoctors,patientAddress);
    }

    // login admin
    function loginAdmin() public{
        isLoggedIn=true;
    }
    // addd doctor unique id from admin
    function addDoctorUniqueId(uint _id) public{
        doctorUidPresent[_id]=true;
        doctorIds.push(_id);
    }
    // add patient unique id from admin
    function addPatientUniqueId(uint _id) public {
        patientUidPresent[_id]=true;
        patientIds.push(_id);
    }

    // check doctor uid is present
    function checkDoctorUniqueIdPresent(uint _id) public view returns(bool){
        return doctorUidPresent[_id];
    }

    // check patient uid present
    function checkPatientUniqueIdPresent(uint _uid) public view returns(bool){
        return patientUidPresent[_uid];
    }


    // check doctor is registerd by mapping
    function isDoctorRegisterd() public view returns(bool){
        return doctorPresent[msg.sender];
    }
    
    // register doctor
    function registerDoctor(string memory _name,uint id) public {
        Doctor d=new Doctor();
        d.registerDoctor(_name,id,msg.sender);
        addressToDoctor[msg.sender]=d;
        doctorPresent[msg.sender]=true;
        registeredDoctors.push(msg.sender);



    }

    function loginDoctor() public{
        addressToDoctor[msg.sender].login();
    }
    
    // getDoctor

    function getDoctor() public view returns(string memory,address,uint,address[] memory,string[] memory) {
        Doctor d=addressToDoctor[msg.sender];
        return (d.getName(),d.getDoctorAddress(),d.getUniqueid(),d.getPatientsRequested(),d.getRecordsIssues());
        
    }

    //register patient
    function registerPatient(string memory _name,uint _uniqueId) public{
        Patient p=new Patient();
        p.registerPatient(_name,_uniqueId,msg.sender);
        addressToPatient[msg.sender]=p;
        patientPresent[msg.sender]=true;
        patientAddress.push(msg.sender);
    }

    // login patient
    function loginPatient() public {
            addressToPatient[msg.sender].login();
    }


    //check patient registered

    function isPatientRegistered() public view returns(bool){
        return patientPresent[msg.sender];
    }


    //get All doctors
    function getAllRegisteredDoctors(address _addr) public view returns(doctorStruct[] memory){
        doctorStruct[] memory doctors=new doctorStruct[](registeredDoctors.length);
          for(uint i=0;i<registeredDoctors.length;i++){
            Doctor d=addressToDoctor[registeredDoctors[i]];
            doctors[i]=doctorStruct(d.getName(),d.getDoctorAddress(),d.getUniqueid(),d.getRecordsIssues(),d.getPatientsTreated(),d.getPatientRequestedPreset(_addr));
        }
        return doctors;
    }

    function addPatientRequested(address doctor) public {
        addressToDoctor[doctor].addPatientRequested(msg.sender);

    }







}