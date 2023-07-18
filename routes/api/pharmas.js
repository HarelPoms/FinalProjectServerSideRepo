// JavaScript Document
const express = require("express");
const router = express.Router();
const pharmaServiceModel = require("../../model/pharmasService/pharmaService");
const pharmaValidationService = require("../../validation/pharmasValidationService");
const userValidationService = require("../../validation/usersValidationService");
const pharmaNormalizationService = require("../../model/pharmasService/helpers/normalizationPharmaService");
const loggedInMiddleware = require("../../middlewares/checkLoggedInMiddleware");
const permissionsMiddleware = require("../../middlewares/permissionsMiddleware");
const CustomError = require("../../utils/CustomError");
const finalCheck = require("../../utils/finalResponseChecker");
const initialValidationService = require("../../utils/initialValidationCheckers");

//Get all pharmas, authorization : all, return : All Pharmas
router.get("/", async (req, res) => {
    const allPharmas = await pharmaServiceModel.getAllPharmas();
    res.status(200).json(allPharmas);
});

//Get pharma by id, authorization : all, Return : The pharma
router.get("/:id", async (req, res) => {
    let idTest = await initialValidationService.initialJoiValidation(pharmaValidationService.pharmaValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    const pharmaFromDB = await pharmaServiceModel.getPharmaById(req.params.id);
    finalCheck(res, pharmaFromDB, 400, "Pharma to get not found");
});

//Create new pharma, authorization : Admin User, Return : The new pharma
router.post("/", loggedInMiddleware, permissionsMiddleware(false, true, false, false), async (req,res) => {
    let newBodyTest = await initialValidationService.initialJoiValidation(pharmaValidationService.pharmaValidation, req.body);
    if(!newBodyTest[0]) return next(new CustomError(400,newBodyTest[1]));
    let normalizedPharma = await pharmaNormalizationService(req.body, req.userData._id);
    const newPharma = await pharmaServiceModel.registerPharma(normalizedPharma);
    finalCheck(res, newPharma, 500, "Pharma not created");
});

//Edit pharma, authorization : User who created the pharma, Return : The edited pharma
router.put("/:id", loggedInMiddleware, permissionsMiddleware(false, true, false, true), async (req, res) => {
    let idTest = await initialValidationService.initialJoiValidation(userValidationService.userIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    let editBodyTest = await initialValidationService.initialJoiValidation(pharmaValidationService.pharmaValidation, req.body);
    if(!editBodyTest[0]) return next(new CustomError(400, editBodyTest[1]));
    let normalizedPharma = await pharmaNormalizationService(req.body, req.userData._id);
    let editResult = await pharmaServiceModel.updatePharma(req.params.id, normalizedPharma);
    finalCheck(res, editResult, 400, "Pharma to edit not found");
})

//Delete pharma, Authorization : Admin, return : The Deleted pharma
router.delete("/:id", loggedInMiddleware, permissionsMiddleware(false, true, false, false), async (req, res) => {
    let idTest = await initialValidationService.initialJoiValidation(userValidationService.userIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    const pharmaFromDB = await pharmaServiceModel.deletePharmaById(req.params.id);
    finalCheck(res, pharmaFromDB, 400, "Could not find the Pharma to delete");
})

module.exports = router;