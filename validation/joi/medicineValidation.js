const Joi = require("joi");
const createMedicineTemplate = {
  title: Joi.string().min(2).max(256).required(),
  subTitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  web: Joi.string()
    .regex(
      new RegExp(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
      )
    )
    .allow(""),
  image: Joi.object().keys({
    url: Joi.string().regex(
      new RegExp(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
      )
    ),
    alt: Joi.string().min(2).max(256).required(),
  }),
  medicineNumber: Joi.number().min(1000000).max(9999999).allow(""),
  pharma_id: Joi.string().hex().length(24),
};

const createMedicineSchema = Joi.object({...createMedicineTemplate});

const editMedicineSchema = Joi.object({...createMedicineTemplate, likes: Joi.array().items(Joi.string())});

const medicineIdSchema = Joi.string().hex().length(24).required();

const medicineNumberSchema = Joi.number().min(1000000).max(9999999).required();

const validateCreateMedicineSchema = (userInput) => {
  return createMedicineSchema.validateAsync(userInput);
};

const validateEditMedicineSchema = (userInput) => {
  return editMedicineSchema.validateAsync(userInput);
}

const validateMedicineIdSchema = (userInput) => {
  return medicineIdSchema.validateAsync(userInput);
}

const validateMedicineNumberSchema = (userInput) => {
  return medicineNumberSchema.validateAsync(userInput);
}

module.exports = {
  validateCreateMedicineSchema, validateEditMedicineSchema, validateMedicineIdSchema, validateMedicineNumberSchema
};
