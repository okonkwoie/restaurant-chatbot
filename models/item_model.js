const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'price must be greater than or equal to 0']
    }
})

module.exports = mongoose.model('items', itemSchema)