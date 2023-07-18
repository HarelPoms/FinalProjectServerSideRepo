const Joi = require("joi"); 

const pharmaSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string()
        .regex(new RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/))
        .required(),
    email: Joi.string()
        .regex(
        new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
        )
        .required(),
    password: Joi.string()
        .regex(
        new RegExp(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        )
        )
        .required(),
    image: Joi.object().keys({
        url: Joi.string().regex(
        new RegExp(
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
        )
        ),
        alt: Joi.string().min(2).max(256).required(),
    }),
    address: Joi.object()
        .keys({
        state: Joi.string().min(2).max(256),
        country: Joi.string().min(2).max(256).required(),
        city: Joi.string().min(2).max(256).required(),
        street: Joi.string().min(2).max(256).required(),
        zip: Joi.number().allow("", 0),
        }).required()
});

const validatePharmaSchema = (userInput) =>
    pharmaSchema.validateAsync(userInput);

module.exports = {
    validatePharmaSchema,
};