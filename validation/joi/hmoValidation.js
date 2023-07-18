const hmoIdSchema = Joi.string().hex().length(24).required();
const hmoCreationSchema = {
    name: Joi.string().min(3).max(25).required()
}

const validateHMOIdSchema = (userInput) => {
    return hmoIdSchema.validateAsync(userInput);
}

const validateHMOCreationSchema = (userInput) => {
    return hmoCreationSchema.validateAsync(userInput);
}

module.exports = {
    validateHMOIdSchema, validateHMOCreationSchema
};