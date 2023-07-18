const config = require("config");
const joiPharmaValidation = require("./joi/pharmasValidations");

const validatorOption = config.get("validatorOption");

const pharmaValidation = (userInput) => {
    if (validatorOption === "Joi") {
        return joiPharmaValidation.validatePharmaSchema(userInput);
    }
    throw new Error("validator undefined");
};

module.exports = {
    pharmaValidation
};