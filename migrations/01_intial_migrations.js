var Example = artifacts.require("./Example.sol");
var Admins = artifacts.require("./Admin.sol");
var Doctors = artifacts.require("./Doctor.sol");
var Patients = artifacts.require("./Patient.sol");

module.exports = function (deployer) {
  deployer.deploy(Example);
  deployer.deploy(Admins);
  deployer.deploy(Doctors);
  deployer.deploy(Patients);
  
};
