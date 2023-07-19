const express = require("express");
const router = express.Router();
const prescriptionServiceModel = require("../../model/prescriptionsService/prescriptionService");
const prescriptionValidationService = require("../../validation/prescriptionValidationService");
const prescriptionNormalizationService = require("../../model/prescriptionsService/helpers/normalizationPrescriptionService");
const loggedInMiddleware = require("../../middlewares/checkLoggedInMiddleware");
const permissionsMiddleware = require("../../middlewares/permissionsMiddleware");
const prescriptionsPermissionsMiddleware = require("../../middlewares/prescriptionsPermissionsMiddleware");
const CustomError = require("../../utils/CustomError");
const finalCheck = require("../../utils/finalResponseChecker");
const initialValidationService = require("../../utils/initialValidationCheckers");

//Get all prescriptions, authorization : all, return : All Prescriptions
router.get("/", loggedInMiddleware, prescriptionsPermissionsMiddleware(true, true, false), async (req, res) => {
    const allPerscriptions = await prescriptionServiceModel.getAllPrescriptions();
    res.status(200).json(allPerscriptions);
});

//Get my prescriptions, authorization : Patient/Doctor, return : Array of users prescriptions
router.get("/my-prescriptions", (req,res) =>{
    console.log("in prescriptions get my prescriptions");
    res.json({ msg: "in prescriptions get my prescriptions" });
})

//Get prescription by id, authorization : all, Return : The prescription
router.get("/:id", loggedInMiddleware, prescriptionsPermissionsMiddleware(true, true, true), async (req, res) => {
    let idTest = await initialValidationService.initialJoiValidation(prescriptionValidationService.PrescriptionIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    const prescriptionFromDB = await prescriptionServiceModel.getPrescriptionById(req.params.id);
    finalCheck(res, prescriptionFromDB, 400, "Pharma to get not found");
});

//Create new prescription (request), authorization : Patient, Doctor, Return : The new prescription
router.post("/", loggedInMiddleware, prescriptionsPermissionsMiddleware(true, false, false), async (req,res) => {
    let newBodyTest = await initialValidationService.initialJoiValidation(prescriptionValidationService.PrescriptionId, req.body);
    if(!newBodyTest[0]) return next(new CustomError(400,newBodyTest[1]));
    let normalizedPrescription = await prescriptionNormalizationService(req.body, req.userData._id);
    const newPrescription = await prescriptionServiceModel.createPrescription(normalizedPrescription);
    finalCheck(res, newPrescription, 500, "Prescription not created");
});

//Edit prescription, authorization : Doctor who is in charge of it, Return : The edited prescription
router.put("/:id", loggedInMiddleware, prescriptionsPermissionsMiddleware(false, false, true), async (req, res) => {
    let idTest = await initialValidationService.initialJoiValidation(prescriptionValidationService.PrescriptionIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    let editBodyTest = await initialValidationService.initialJoiValidation(prescriptionValidationService.editPrescriptionValidation, req.body);
    if(!editBodyTest[0]) return next(new CustomError(400, editBodyTest[1]));
    let normalizedPrescription = await prescriptionNormalizationService(req.body, req.userData._id);
    let editResult = await prescriptionServiceModel.updatePrescription(req.params.id, normalizedPrescription);
    finalCheck(res, editResult, 400, "Prescription to edit not found");
})

//Delete prescription, Authorization : Admin, Doctor in charge, return : The Deleted prescription
router.delete("/:id", loggedInMiddleware, prescriptionsPermissionsMiddleware(false, false, true), async (req, res) => {
    let idTest = await initialValidationService.initialJoiValidation(prescriptionValidationService.PrescriptionIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    const prescriptionFromDB = await prescriptionServiceModel.deletePrescriptionById(req.params.id);
    finalCheck(res, prescriptionFromDB, 400, "Could not find the Prescription to delete");
})

module.exports = router;