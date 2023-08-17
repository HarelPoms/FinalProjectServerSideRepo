const CustomError = require("../utils/CustomError");
const { getMedicineById } = require("../model/medicinesService/medicinesService");
const { getUserById } = require("../model/usersService/usersService");

const {medicineIdValidation} = require("../validation/medicinesValidationService");
const {userIdValidation} = require("../validation/usersValidationService");

const checkIfPharmaOwner = async (pharmaId, medicineId, res, next) => {
  try {
    await medicineIdValidation(medicineId);
    const medicineData = await getMedicineById(medicineId);
    if (!medicineData) {
      return res.status(400).json({ msg: "medicine not found" });
    }
    if (medicineData.pharma_id == pharmaId) {
      next();
    } else {
      res.status(401).json({ msg: "You are not the pharma user who owns the medicine" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const userCheckIfTheSameUser = async (loggedInUserId, idOfUserDataToAccess, res, next) => {
  try{
    await userIdValidation(idOfUserDataToAccess);
    const UserData = await getUserById(idOfUserDataToAccess);
    if (!UserData) {
      return res.status(400).json({ msg: "User not found" });
    }
    if (UserData._id == loggedInUserId){
      next();
    }
    else{
      res.status(401).json({ msg: "You are not the same registered user" });
    }
  }
  catch(err){
    res.status(400).json(err);
  }
}

/*
  isDoctor = every Doctor
  isAdmin = is admin
  isPharmaOwner = is pharma owner of medicine
  isSameUserApiCheck = To check if the user requesting access to user data, is the same user
*/
const permissionsMiddleware = (isDoctor, isAdmin, isPharmaOwner, isSameUserApiCheck, isPharma) => {
  return (req, res, next) => {
    if (!req.userData) {
      throw new CustomError("must provide userData");
    }
    if (isDoctor === req.userData.isDoctor && isDoctor === true) {
      return next();
    }
    if (isAdmin === req.userData.isAdmin && isAdmin === true) {
      return next();
    }
    if (isPharmaOwner === req.userData.isPharma && isPharmaOwner === true) {
      return checkIfPharmaOwner(req.userData._id, req.params.id, res, next);
    }
    if (isSameUserApiCheck === true){
      return userCheckIfTheSameUser(req.userData._id, req.params.id, res, next);
    }
    if (req.userData.isPharma === isPharma && isPharma === true){
      return next();
    }
    res.status(401).json({ msg: "You are not allowed to modify this asset" });
  };
};

module.exports = permissionsMiddleware;
