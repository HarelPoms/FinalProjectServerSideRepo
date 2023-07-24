const Joi = require("joi").extend(require('@joi/date')); 

let prescriptionSubItemJoiSchema = Joi.object().keys({
    medicineId: Joi.string().hex().length(24).required(),
    medicineName: Joi.string().required(),
    medicineUnits: Joi.number().integer().min(1).max(5).required(),
    isActive: Joi.boolean().required()
})

const createPrescriptionSchema = {
    image: Joi.object().keys({
    url: Joi.string().regex(
    new RegExp(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)),
        alt: Joi.string().min(2).max(256).required(),
    }),
    medicineList: Joi.array().items(prescriptionSubItemJoiSchema),
    patientId: Joi.string().hex().length(24).required(),
    patientName: Joi.string().required(),
    doctorId: Joi.string().hex().length(24).required(),
    doctorName: Joi.string().required(),
    expiryDate: Joi.date().format('YYYY-MM-DD HH:mm'),
    HMO: Joi.string().hex().length(24),
    isActive: Joi.boolean()
}

const prescriptionIdSchema = Joi.string().hex().length(24).required();

const validateCreatePrescriptionSchema = (userInput) => {
    return createPrescriptionSchema.validateAsync(userInput);
};

const validateEditPrescriptionSchema = (userInput) => {
    return createPrescriptionSchema.validateAsync(userInput);
}

const validatePrescriptionIdSchema = (userInput) => {
    return prescriptionIdSchema.validateAsync(userInput);
}

module.exports = {
    validateCreatePrescriptionSchema, validateEditPrescriptionSchema, validatePrescriptionIdSchema
};
