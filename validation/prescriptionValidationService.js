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
        return joiPrescriptionsValidation.validateEditPrescriptionSchema(userInput);
    }
    throw new Error("validator undefined");
}

const PrescriptionIdValidation = (userInput) => {
    if (validatorOption === "Joi") {
        return joiPrescriptionsValidation.validatePrescriptionIdSchema(userInput);
    }
    throw new Error("validator undefined");
}

const PrescriptionResponsibilityValidation = (userInput) => {
    if (validatorOption === "Joi") {
        return joiPrescriptionsValidation.validatePrescriptionResponsibilitySchema(userInput);
    }
    throw new Error("validator undefined");
}

module.exports = {
    createPrescriptionValidation, editPrescriptionValidation,
    PrescriptionIdValidation, PrescriptionResponsibilityValidation
};