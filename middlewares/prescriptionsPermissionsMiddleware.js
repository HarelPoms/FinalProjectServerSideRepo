const CustomError = require("../utils/CustomError");
const { getPrescriptionById } = require("../model/prescriptionsService/prescriptionService");
const {PrescriptionIdValidation} = require("../validation/prescriptionValidationService");

//prescriptionData -> PrescriptionId and DoctorId
//IsDoctor = true - Doctor, false - Patient
const userCheckIfSameDoctorOrPatient = async (prescriptionId ,loggedInId, isDoctor, res, next) => {
    try{
        await PrescriptionIdValidation(prescriptionId);
        const prescriptionData = await getPrescriptionById(prescriptionId);
        if(isDoctor && prescriptionData.doctorId == loggedInId){
            next();
        }
        else if(prescriptionData.patientId == loggedInId){
            next();
        }
        else{
            res.status(401).json({ msg: "You are not the Doctor or the Patient of this prescription" });
        }
    }
    catch (err) {
        res.status(400).json(err);
    }
}

const prescriptionsPermissionsMiddleware = (isDoctor, isAdmin ,isSameDoctorOrPatient) => {
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
        if (isSameDoctorOrPatient === true){
            return userCheckIfSameDoctorOrPatient(req.params.id, req.userData._id, req.userData.isDoctor, res, next);
        }
        res.status(401).json({ msg: "You are not allowed to modify this asset" });
    };
};

module.exports = prescriptionsPermissionsMiddleware;