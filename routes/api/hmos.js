const express = require("express");
const router = express.Router();
const hmoServiceModel = require("../../model/hmosService/hmosService");
const usersServiceModel = require("../../model/usersService/usersService");
const prescriptionsServiceModel = require("../../model/prescriptionsService/prescriptionService");
const hmoValidationService = require("../../validation/hmosValidationService");
const loggedInMiddleware = require("../../middlewares/checkLoggedInMiddleware");
const permissionsMiddleware = require("../../middlewares/permissionsMiddleware");
const CustomError = require("../../utils/CustomError");
const finalCheck = require("../../utils/finalResponseChecker");
const initialValidationService = require("../../utils/initialValidationCheckers");

//Get all HMOs, authorization : all, return : All HMOs
router.get("/", async (req, res) => {
    const allHMOS = await hmoServiceModel.getAllHMOs();
    res.status(200).json(allHMOS);
});

//Get HMO by id, authorization : all, Return : The HMO
router.get("/:id", async (req, res, next) => {
    let idTest = await initialValidationService.initialJoiValidation(hmoValidationService.hmosIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    const hmoFromDB = await hmoServiceModel.getHMOById(req.params.id);
    finalCheck(res, hmoFromDB, 400, "HMO to get not found");
});

//Create new HMO, authorization : Admin User, Return : The new HMO
router.post("/", loggedInMiddleware, permissionsMiddleware(false, true, false, false) ,async (req,res, next) => {
    let newHMOBodyTest = await initialValidationService.initialJoiValidation(hmoValidationService.hmoCreationValidation, req.body);
    if(!newHMOBodyTest[0]) return next(new CustomError(400,newHMOBodyTest[1]));
    const newHmo = await hmoServiceModel.createHMO(req.body);
    finalCheck(res, newHmo, 500, "HMO not created");
});

//Edit HMO, authorization : Admin, Return : The edited HMO
router.put("/:id", loggedInMiddleware, permissionsMiddleware(false, true, false, false), async (req, res, next) => {
    let idTest = await initialValidationService.initialJoiValidation(hmoValidationService.hmosIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    let editBodyTest = await initialValidationService.initialJoiValidation(hmoValidationService.hmoCreationValidation, req.body);
    if(!editBodyTest[0]) return next(new CustomError(400, editBodyTest[1]));
    let editResult = await hmoServiceModel.updateHMO(req.params.id, req.body);
    finalCheck(res, editResult, 400, "HMO to edit not found");
});

//Delete HMO, Authorization : Admin, return : The Deleted HMO
router.delete("/:id", loggedInMiddleware, permissionsMiddleware(false, true, false, false), async (req, res, next) => {
    let idTest = await initialValidationService.initialJoiValidation(hmoValidationService.hmosIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    let prescriptionsWithThisHmo = await prescriptionsServiceModel.getPrescriptionsWithSpecificHMO(req.params.id);
    let usersWithThisHmo = await usersServiceModel.getUsersWithSpecificHMO(req.params.id);
    if(prescriptionsWithThisHmo || usersWithThisHmo) return next(new CustomError(400, "Can't delete HMO with other data attached to it"));
    const hmoFromDB = await hmoServiceModel.deleteHMO(req.params.id);
    finalCheck(res, hmoFromDB, 400, "Could not find the HMO to delete");
});

module.exports = router;