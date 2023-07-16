const config = require("config");
const joiMedicinesValidation = require("./joi/medicineValidation");

const validatorOption = config.get("validatorOption");

const createMedicineValidation = (userInput) => {
    if (validatorOption === "Joi") {
        return joiMedicinesValidation.validateCreateMedicineSchema(userInput);
    }
    throw new Error("validator undefined");
};

const editMedicineValidation = (userInput) => {
    if (validatorOption === "Joi") {
        return joiMedicinesValidation.validateEditMedicineSchema(userInput);
    }
    throw new Error("validator undefined");
}

const medicineIdValidation = (userInput) => {
    if (validatorOption === "Joi") {
        return joiMedicinesValidation.validateMedicineIdSchema(userInput);
    }
    throw new Error("validator undefined");
}

const medicineNumberValidation = (userInput) => {
    if (validatorOption === "Joi") {
        return joiMedicinesValidation.validateMedicineNumberSchema(userInput);
    }
    throw new Error("validator undefined");
}

module.exports = {
    createMedicineValidation, editMedicineValidation, medicineIdValidation, medicineNumberValidation
};
