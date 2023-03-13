const Joi = require('joi')

const itemSchema = Joi.object({
    name: Joi.string()
            .min(5)
            .max(50)
            .required()
            .trim(),
    price: Joi.number()
            .min(0)
            .required(),
})


module.exports = itemSchema