const express = require("express");
const router = express.Router();
const medicineServiceModel = require("../../model/medicinesService/medicinesService");
const medicineValidationService = require("../../validation/medicinesValidationService");
const medicineNormalizationService = require("../../model/medicinesService/helpers/normalizationMedicineService");
const loggedInMiddleware = require("../../middlewares/checkLoggedInMiddleware");
const permissionsMiddleware = require("../../middlewares/permissionsMiddleware");
const CustomError = require("../../utils/CustomError");
const finalCheck = require("../../utils/finalResponseChecker");
const initialValidationService = require("../../utils/initialValidationCheckers");

//Get all medicines, authorization : all, return : All Cards
router.get("/", async (req, res) => {
    const allMedicines = await medicineServiceModel.getAllMedicines();
    res.status(200).json(allMedicines);
});

//Get all meds favorited by the logged in user
router.get("/my-fav-meds", loggedInMiddleware, async(req,res,next) => {
    const favMedsOfUser = await medicineServiceModel.getMedicinesLikedByUser(req.userData._id);
    finalCheck(res, favMedsOfUser, 500, "Fav Medicines not created");
});

//Get medicine by id, authorization : all, Return : The medicine
router.get("/:id", async (req, res, next) => {
    let idTest = await initialValidationService.initialJoiValidation(medicineValidationService.medicineIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    const medicineFromDB = await medicineServiceModel.getMedicineById(req.params.id);
    finalCheck(res, medicineFromDB, 400, "Medicine to get not found");
});

//Create new medicine, authorization : Pharma User, Return : The new medicine
router.post("/", loggedInMiddleware, permissionsMiddleware(false, false, true, false),  async (req,res, next) => {
    let newMedicineBodyTest = await initialValidationService.initialJoiValidation(medicineValidationService.createMedicineValidation, req.body);
    if(!newMedicineBodyTest[0]) return next(new CustomError(400,newMedicineBodyTest[1]));
    let normalMedicine = await medicineNormalizationService(req.body, req.userData._id);
    const newMedicine = await medicineServiceModel.createMedicine(normalMedicine);
    finalCheck(res, newMedicine, 500, "Medicine not created");
});

//Edit medicine, authorization : User who created the medicine, Return : The edited medicine
router.put("/:id", loggedInMiddleware, permissionsMiddleware(false, false, true, false), async (req, res, next) => {
    let idTest = await initialValidationService.initialJoiValidation(medicineValidationService.medicineIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    let editBodyTest = await initialValidationService.initialJoiValidation(medicineValidationService.editMedicineValidation, req.body);
    if(!editBodyTest[0]) return next(new CustomError(400, editBodyTest[1]));
    let normalizedMedicine = await medicineNormalizationService(req.body, req.userData._id);
    let editResult = await medicineServiceModel.updateMedicine(req.params.id, normalizedMedicine);
    finalCheck(res, editResult, 400, "Medicine to edit not found");
})

//Like medicine, authorization : The User is registered, Return : The Liked medicine
router.patch("/:id", loggedInMiddleware, async (req, res, next) => {
    let idTest = await initialValidationService.initialJoiValidation(medicineValidationService.medicineIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    const medicineFromDB = await medicineServiceModel.getMedicineById(req.params.id);
    const userIdStr = req.userData._id + "";
    if(medicineFromDB){
        const medicineLikes = medicineFromDB.likes.find((id) => id === userIdStr);
        if(!medicineLikes){
            medicineFromDB.likes.push(userIdStr);
            medicineAfterSave = await medicineServiceModel.updateMedicine(req.params.id, medicineFromDB);
            res.status(200).json(medicineAfterSave);
        }
        else{
            const likesFiltered = medicineFromDB.likes.filter((id) => id !== userIdStr);
            medicineFromDB.likes = likesFiltered;
            medicineAfterSave = await medicineServiceModel.updateMedicine(req.params.id, medicineFromDB);
            res.status(200).json(medicineAfterSave);
        }
    }
    else{
        res.status(400).json({msg: "could not find the medicine to like"});
    }
})

//Delete medicine, Authorization : The User who created the medicine, or admin, return : The Deleted medicine
router.delete("/:id", loggedInMiddleware, permissionsMiddleware(false, true, true, false), async (req, res, next) => {
    let idTest = await initialValidationService.initialJoiValidation(medicineValidationService.medicineIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    const medicineFromDB = await medicineServiceModel.deleteMedicine(req.params.id);
    finalCheck(res, medicineFromDB, 400, "Could not find the Medicine to delete");
})


module.exports = router;