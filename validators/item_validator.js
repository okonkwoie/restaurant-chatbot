const Joi = require('joi')

const itemSchema = Joi.object({
    name: Joi.string()
            .min(1)
            .required()
            .trim(),
    price: Joi.number()
            .min(0)
            .required()
})


module.exports = itemSchema