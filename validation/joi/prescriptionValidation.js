const createPescriptionSchema = {
    patientId: Joi.string().hex().length(24).required(),
    patientName: Joi.string().required(),
    doctorId: Joi.string().hex().length(24).required(),
    doctorName: Joi.string().required(),
    expiryDate: Joi.date().format(['DD/MM/YYYY', 'DD-MM-YYYY']),
    HMO: Joi.string().required(),
    isActive: Joi.boolean()
}

const validateCreatePrescriptionSchema = (userInput) => {
    return createPescriptionSchema.validateAsync(userInput);
};

module.exports = {
    validateCreatePrescriptionSchema
};
