const Joi = require("joi");

const orderSchema = Joi.object({
  user: Joi.string().required(),
  items: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        price: Joi.number().min(0).required(),
        quantity: Joi.number().required(),
      })
    )
    .required(),
  createdAt: Joi.date(),
});

module.exports = orderSchema;
