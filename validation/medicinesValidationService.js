const config = require("config");
const joiCardsValidation = require("./joi/medicineValidation");

const validatorOption = config.get("validatorOption");

const createMedicineValidation = (userInput) => {
    if (validatorOption === "Joi") {
        return joiCardsValidation.validateCreateMedicineSchema(userInput);
    }
    throw new Error("validator undefined");
};

const editMedicineValidation = (userInput) => {
    if (validatorOption === "Joi") {
        return joiCardsValidation.validateEditMedicineSchema(userInput);
    }
    throw new Error("validator undefined");
}

const medicineIdValidation = (userInput) => {
    if (validatorOption === "Joi") {
        return joiCardsValidation.validateMedicineIdSchema(userInput);
    }
    throw new Error("validator undefined");
}

const medicineNumberValidation = (userInput) => {
    if (validatorOption === "Joi") {
        return joiCardsValidation.validateMedicineNumberSchema(userInput);
    }
    throw new Error("validator undefined");
}

module.exports = {
    createMedicineValidation, editMedicineValidation, medicineIdValidation, medicineNumberValidation
};
