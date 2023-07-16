const config = require("config");
const joiHmosValidation = require("./joi/hmoValidation");

const validatorOption = config.get("validatorOption");

const hmosIdValidation = (userInput) => {
    if (validatorOption === "Joi") {
        return joiHmosValidation.validateHMOIdSchema(userInput);
    }
    throw new Error("validator undefined");
}

module.exports = {
    hmosIdValidation
};

