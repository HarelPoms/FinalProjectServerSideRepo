const hmoIdSchema = Joi.string().hex().length(24).required();

const validateHMOIdSchema = (userInput) => {
    return hmoIdSchema.validateAsync(userInput);
}

module.exports = {
    validateHMOIdSchema
};