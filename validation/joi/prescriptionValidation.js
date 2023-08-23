const Joi = require("joi").extend(require('@joi/date')); 

let prescriptionSubItemJoiSchema = Joi.object().keys({
    medicineId: Joi.number().min(1000000).max(9999999).allow(""),
    medicineName: Joi.string().required(),
    medicineUnits: Joi.number().integer().min(1).max(5).required(),
    isActive: Joi.boolean().required()
})

const createPrescriptionSchema = Joi.object({
    image: Joi.object().keys({
        url: Joi.string().regex(
        new RegExp(
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)).allow(""),
        alt: Joi.string().min(2).max(256).required().allow(""),
    }),
    medicineList: Joi.array().items(prescriptionSubItemJoiSchema),
    patientId: Joi.string().hex().length(24).required(),
    doctorId: Joi.string().hex().length(24),
    expiryDate: Joi.date().format('YYYY-MM-DD HH:mm'),
    isActive: Joi.boolean()
});

const editPrescriptionSchema = Joi.object({
    image: Joi.object().keys({
        url: Joi.string().regex(
        new RegExp(
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)).allow(""),
        alt: Joi.string().min(2).max(256).required(),
    }),
    medicineList: Joi.array().items(prescriptionSubItemJoiSchema),
    patientId: Joi.string().hex().length(24),
    doctorId: Joi.string().hex().length(24).allow(""),
    expiryDate: Joi.date().format('YYYY-MM-DD HH:mm'),
    HMO: Joi.string().hex().length(24),
    isActive: Joi.boolean()
});

const prescriptionDoctorIdSchema = Joi.object({
    doctorId: Joi.string().hex().length(24).required()
});

const prescriptionIdSchema = Joi.string().hex().length(24).required();

const validateCreatePrescriptionSchema = (userInput) => {
    return createPrescriptionSchema.validateAsync(userInput);
};

const validateEditPrescriptionSchema = (userInput) => {
    return editPrescriptionSchema.validateAsync(userInput);
}

const validatePrescriptionIdSchema = (userInput) => {
    return prescriptionIdSchema.validateAsync(userInput);
}

const validatePrescriptionResponsibilitySchema = (userInput) => {
    return prescriptionDoctorIdSchema.validateAsync(userInput);
}

module.exports = {
    validateCreatePrescriptionSchema, validateEditPrescriptionSchema, validatePrescriptionIdSchema,
    validatePrescriptionResponsibilitySchema
};
