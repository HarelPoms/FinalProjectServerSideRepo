const config = require("config");
const joiPrescriptionsValidation = require("./joi/prescriptionValidation");
const validatorOption = config.get("validatorOption");

const createPrescriptionValidation = (userInput) => {
    if (validatorOption === "Joi") {
        return joiPrescriptionsValidation.validateCreatePrescriptionSchema(userInput);
    }
    throw new Error("validator undefined");
};

const editPrescriptionValidation = (userInput) => {
    if (validatorOption === "Joi") {
        return joiPrescriptionsValidation.validateEditPerscriptionSchema(userInput);
    }
    throw new Error("validator undefined");
}

const PrescriptionIdValidation = (userInput) => {
    if (validatorOption === "Joi") {
        return joiPrescriptionsValidation.validatePerscriptionIdSchema(userInput);
    }
    throw new Error("validator undefined");
}

module.exports = {
    createPrescriptionValidation, editPrescriptionValidation,
    PrescriptionIdValidation
};