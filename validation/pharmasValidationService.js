const config = require("config");
const joiPharmaValidation = require("./joi/pharmasValidations");

const validatorOption = config.get("validatorOption");

const newPharmaValidation = (userInput) => {
    if (validatorOption === "Joi") {
        return joiPharmaValidation.validateNewPharmaSchema(userInput);
    }
    throw new Error("validator undefined");
};

const editPharmaValidation = (userInput) => {
    if (validatorOption === "Joi") {
        return joiPharmaValidation.validateEditPharmaSchema(userInput);
    }
    throw new Error("validator undefined");
}

module.exports = {
    newPharmaValidation, editPharmaValidation
};