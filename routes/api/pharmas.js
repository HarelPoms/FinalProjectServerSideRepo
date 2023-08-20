// JavaScript Document
const express = require("express");
const router = express.Router();
const pharmaServiceModel = require("../../model/pharmasService/pharmaService");
const medicineServiceModel = require("../../model/medicinesService/medicinesService");
const pharmaValidationService = require("../../validation/pharmasValidationService");
const userValidationService = require("../../validation/usersValidationService");
const pharmaNormalizationService = require("../../model/pharmasService/helpers/normalizationPharmaService");
const loggedInMiddleware = require("../../middlewares/checkLoggedInMiddleware");
const permissionsMiddleware = require("../../middlewares/permissionsMiddleware");
const CustomError = require("../../utils/CustomError");
const finalCheck = require("../../utils/finalResponseChecker");
const initialValidationService = require("../../utils/initialValidationCheckers");
const hashService = require("../../utils/hash/hashService");
const { generateToken } = require("../../utils/token/tokenService");

//Get all pharmas, authorization : all, return : All Pharmas
router.get("/", async (req, res) => {
    const allPharmas = await pharmaServiceModel.getAllPharmas();
    res.status(200).json(allPharmas);
});

router.get("/my-medicines", loggedInMiddleware, permissionsMiddleware(false, false, false, false, true), async (req,res,next) => {
    const medicinesFromDBOfPharma = await medicineServiceModel.getMedicinesCreatedByUser(req.userData._id);
    finalCheck(res, medicinesFromDBOfPharma, 500, "Medicines of pharma not found");
});

//Get pharma by id, authorization : all, Return : The pharma
router.get("/:id", async (req, res, next) => {
    let idTest = await initialValidationService.initialJoiValidation(userValidationService.userIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    const pharmaFromDB = await pharmaServiceModel.getPharmaById(req.params.id);
    finalCheck(res, pharmaFromDB, 400, "Pharma to get not found");
});

//Create new pharma, authorization : Admin User, Return : The new pharma
router.post("/", loggedInMiddleware, permissionsMiddleware(false, true, false, false, false), async (req,res,next) => {
    let newBodyTest = await initialValidationService.initialJoiValidation(pharmaValidationService.newPharmaValidation, req.body);
    if(!newBodyTest[0]) return next(new CustomError(400,newBodyTest[1]));
    let normalizedPharma = await pharmaNormalizationService.normalizationCreatePharmaService(req.body);
    const newPharma = await pharmaServiceModel.registerPharma(normalizedPharma);
    finalCheck(res, newPharma, 500, "Pharma not created");
});

//Login Pharma, authorization : all, return : Encrypted token
router.post("/login", async (req,res,next) =>{
    let loginBodyTest = await initialValidationService.initialJoiValidation(userValidationService.loginUserValidation, req.body);
    if(!loginBodyTest[0]) return next(new CustomError(400,loginBodyTest[1]));
    const userData = await pharmaServiceModel.getPharmaByEmail(req.body.email);
    if (!userData) return next(new CustomError(400,"Invalid email"));
    const isPasswordMatch = await hashService.cmpHash(
        req.body.password,
        userData.password
    );
    if (!isPasswordMatch)
    {
        return next(new CustomError(403,"Invalid password"));
    }
    const token = await generateToken({
        _id: userData._id,
        isDoctor: false,
        isAdmin: false,
        isPharma: true
    });
    res.status(200).json({ token });
})

//Edit pharma, authorization : The admin, Return : The edited pharma
router.put("/:id", loggedInMiddleware, permissionsMiddleware(false, true, false, false, false), async (req, res,next) => {
    let idTest = await initialValidationService.initialJoiValidation(userValidationService.userIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    let editBodyTest = await initialValidationService.initialJoiValidation(pharmaValidationService.editPharmaValidation, req.body);
    if(!editBodyTest[0]) return next(new CustomError(400, editBodyTest[1]));
    let normalizedPharma = await pharmaNormalizationService.normalizationEditPharmaService(req.body);
    let editResult = await pharmaServiceModel.updatePharma(req.params.id, normalizedPharma);
    finalCheck(res, editResult, 400, "Pharma to edit not found");
})

//Delete pharma, Authorization : Admin, return : The Deleted pharma
router.delete("/:id", loggedInMiddleware, permissionsMiddleware(false, true, false, false, false), async (req, res,next) => {
    let idTest = await initialValidationService.initialJoiValidation(userValidationService.userIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]))
    const medicinesOfPharma = await medicineServiceModel.getMedicinesCreatedByUser(req.params.id);
    if(medicinesOfPharma) return next(new CustomError(400, "Can't delete pharm with linked medicine"));
    const pharmaFromDB = await pharmaServiceModel.deletePharmaById(req.params.id);
    finalCheck(res, pharmaFromDB, 400, "Could not find the Pharma to delete");
})

module.exports = router;