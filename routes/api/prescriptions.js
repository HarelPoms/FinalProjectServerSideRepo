const express = require("express");
const router = express.Router();
const prescriptionServiceModel = require("../../model/prescriptionsService/prescriptionService");
const prescriptionValidationService = require("../../validation/prescriptionValidationService");
const prescriptionNormalizationService = require("../../model/prescriptionsService/helpers/normalizationPrescriptionService");
const loggedInMiddleware = require("../../middlewares/checkLoggedInMiddleware");
const prescriptionsPermissionsMiddleware = require("../../middlewares/prescriptionsPermissionsMiddleware");
const CustomError = require("../../utils/CustomError");
const finalCheck = require("../../utils/finalResponseChecker");
const initialValidationService = require("../../utils/initialValidationCheckers");
const userServiceModel = require("../../model/usersService/usersService");

//Get all prescriptions, authorization : all, return : All Prescriptions
router.get("/", loggedInMiddleware, prescriptionsPermissionsMiddleware(true, true, false, false), async (req, res) => {
    const allPerscriptions = await prescriptionServiceModel.getAllPrescriptions();
    res.status(200).json(allPerscriptions);
});

//Get my prescriptions (Doctor/Patient), authorization : Patient/Doctor, return : Array of users prescriptions
router.get("/my-prescriptions", loggedInMiddleware, async (req,res) =>{
    let myPrescriptions;
    if(req.userData.isDoctor){
        myPrescriptions = await prescriptionServiceModel.getPrescriptionsByDoctor(req.userData._id);
    }
    else{
        myPrescriptions = await prescriptionServiceModel.getPrescriptionsByPatient(req.userData._id);
    }
    finalCheck(res, myPrescriptions, 400, "My Prescriptions to get not found");
})

//Get prescription by id, authorization : all, Return : The prescription
router.get("/:id", loggedInMiddleware, prescriptionsPermissionsMiddleware(true, true, true, true), async (req, res,next) => {
    let idTest = await initialValidationService.initialJoiValidation(prescriptionValidationService.PrescriptionIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    const prescriptionFromDB = await prescriptionServiceModel.getPrescriptionById(req.params.id);
    finalCheck(res, prescriptionFromDB, 400, "Prescription to get not found");
});

//Create new prescription (request which can become effective prescription), authorization : Patient, Doctor, Return : The new prescription
router.post("/", loggedInMiddleware, prescriptionsPermissionsMiddleware(true, false, true, false), async (req,res,next) => {
    let newBodyTest = await initialValidationService.initialJoiValidation(prescriptionValidationService.createPrescriptionValidation, req.body);
    if(!newBodyTest[0]) return next(new CustomError(400,newBodyTest[1]));
    let normalizedPrescription = await prescriptionNormalizationService(req.body, await userServiceModel.getUserById(req.userData._id));
    const newPrescription = await prescriptionServiceModel.createPrescription(normalizedPrescription);
    finalCheck(res, newPrescription, 500, "Prescription not created");
});

//Edit prescription, authorization : Doctor who is in charge of it, Return : The edited prescription
router.put("/:id", loggedInMiddleware, prescriptionsPermissionsMiddleware(false, false, false, true), async (req, res, next) => {
    let idTest = await initialValidationService.initialJoiValidation(prescriptionValidationService.PrescriptionIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    let editBodyTest = await initialValidationService.initialJoiValidation(prescriptionValidationService.editPrescriptionValidation, req.body);
    if(!editBodyTest[0]) return next(new CustomError(400, editBodyTest[1]));
    let normalizedPrescription = await prescriptionNormalizationService(req.body, await userServiceModel.getUserById(req.userData._id));
    let editResult = await prescriptionServiceModel.updatePrescription(req.params.id, normalizedPrescription);
    finalCheck(res, editResult, 400, "Prescription to edit not found");
});

router.patch("/:prescriptionId/:subItemId", loggedInMiddleware, prescriptionsPermissionsMiddleware(false,false,false,true), async (req,res,next) => {
    console.log("IN PUT SUBITEM SWITCH");
    console.log(req.params.prescriptionId);
    console.log(req.params.subItemId);
    let prescriptionIdTest = await initialValidationService.initialJoiValidation(prescriptionValidationService.PrescriptionIdValidation, req.params.prescriptionId);
    if(!prescriptionIdTest[0]) return next(new CustomError(400, prescriptionIdTest[1]));
    let subItemIdTest = await initialValidationService.initialJoiValidation(prescriptionValidationService.PrescriptionIdValidation, req.params.subItemId);
    if(!subItemIdTest[0]) return next(new CustomError(400, subItemIdTest[1]));
    let subItemStatusSwitchResult = await prescriptionServiceModel.changePrescriptionSubItemActiveStatus(req.params.prescriptionId, req.params.subItemId);
    finalCheck(res, subItemStatusSwitchResult, 400, "Prescription sub item active status not flipped");
});

//Delete prescription, Authorization : Admin, Doctor in charge, return : The Deleted prescription
router.delete("/:id", loggedInMiddleware, prescriptionsPermissionsMiddleware(false, true, false, true), async (req, res,next) => {
    let idTest = await initialValidationService.initialJoiValidation(prescriptionValidationService.PrescriptionIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    const prescriptionFromDB = await prescriptionServiceModel.deletePrescriptionById(req.params.id);
    finalCheck(res, prescriptionFromDB, 400, "Could not find the Prescription to delete");
});

module.exports = router;