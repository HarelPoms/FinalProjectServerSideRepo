const express = require("express");
const router = express.Router();
const usersServiceModel = require("../../model/usersService/usersService");
const usersValidationService = require("../../validation/usersValidationService");
const normalizeUserService = require("../../model/usersService/helpers/normalizationUserService");
const loggedInMiddleware = require("../../middlewares/checkLoggedInMiddleware");
const permissionsMiddleware = require("../../middlewares/permissionsMiddleware");
const CustomError = require("../../utils/CustomError");
const hashService = require("../../utils/hash/hashService");
const { generateToken } = require("../../utils/token/tokenService");
const finalCheck = require("../../utils/finalResponseChecker");
const initialValidationService = require("../../utils/initialValidationCheckers");

//Get all users, authorization : Admin, Return : array of users
router.get("/", loggedInMiddleware, permissionsMiddleware(false, true, false, false), async (req, res) => {
    const allUsers = await usersServiceModel.getAllUsers();
    res.status(200).json(allUsers);
});

//Get specific user, authorization : Admin or registered user, Return : User
router.get("/:id", loggedInMiddleware, permissionsMiddleware(false,true,false,true), async (req, res, next) => {
    let idTest = await initialValidationService.initialJoiValidation(usersValidationService.userIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    let wantedUser = await usersServiceModel.getUserById(req.params.id);
    finalCheck(res, wantedUser, 404, "User Not Found");
});

//Register User, authorization : all, return : registered user, needs unique email
router.post("/", async (req, res, next) => {
    let registerBodyTest = await initialValidationService.initialJoiValidation(usersValidationService.registerUserValidation, req.body);
    if(!registerBodyTest[0]) return next(new CustomError(400,registerBodyTest[1]));
    let checkIfEmailIsTaken = await usersServiceModel.getUserByEmail(req.body.email);
    if(checkIfEmailIsTaken) return next(new CustomError(400, "Email Already Taken"));
    let normalizedUser = await normalizeUserService.normalizeCreatedUserService(req.body);
    normalizedUser.password = await hashService.generateHash(normalizedUser.password);
    let createdUser = await usersServiceModel.registerUser(normalizedUser);
    finalCheck(res, createdUser, 500, "Registration went wrong");
});

//Login User, authorization : all, return : Encrypted token
router.post("/login", async (req,res, next) =>{
    let loginBodyTest = await initialValidationService.initialJoiValidation(usersValidationService.loginUserValidation, req.body);
    if(!loginBodyTest[0]) return next(new CustomError(400,loginBodyTest[1]));
    const userData = await usersServiceModel.getUserByEmail(req.body.email);
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
        isDoctor: userData.isDoctor,
        isAdmin: userData.isAdmin,
        isPharma: false
    });
    res.status(200).json({ token });
})

//Edit user, authorization : The registered user, Return : The edited user
router.put("/:id", loggedInMiddleware, permissionsMiddleware(false, false, false, true), async (req, res, next) => {
    let idTest = await initialValidationService.initialJoiValidation(usersValidationService.userIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    let editBodyTest = await initialValidationService.initialJoiValidation(usersValidationService.profileUserValidation, req.body);
    if(!editBodyTest[0]) return next(new CustomError(400,editBodyTest[1]));
    if(req.body.email){
        let checkIfEmailIsTaken = await usersServiceModel.getUserByEmail(req.body.email);
        if(checkIfEmailIsTaken) return next(new CustomError(400, "Email Already Taken"));
    }
    let normalizedEditedUser = normalizeUserService.normalizeEditedUserService(req.body);
    if(normalizedEditedUser.password){
        normalizedEditedUser.password = await hashService.generateHash(normalizedEditedUser.password);
    }
    let editResult = await usersServiceModel.updateUser(req.params.id, normalizedEditedUser);
    finalCheck(res, editResult, 400, "User to edit not found");
})

//Change is Doctor status, authorization : The registered user, Return : The User
router.patch("/:id", loggedInMiddleware, permissionsMiddleware(false,true,false,true), async (req, res, next) => {
    let idTest = await initialValidationService.initialJoiValidation(usersValidationService.userIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    let doctorStatusUpdateResult = await usersServiceModel.changeDoctorStatusById(req.params.id);
    finalCheck(res, doctorStatusUpdateResult, 400, "User to update not found");
})

//Delete User, Authorization : The registered User or Admin, return : The Deleted User
router.delete("/:id", loggedInMiddleware, permissionsMiddleware(false, true, false, true), async (req, res, next) => {
    let idTest = await initialValidationService.initialJoiValidation(usersValidationService.userIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    let deletedUser = await usersServiceModel.deleteUserById(req.params.id);
    finalCheck(res, deletedUser, 400, "User to delete not found");
})

module.exports = router;