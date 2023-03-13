const express = require('express')
const itemModel = require('../models/item_model')

const itemRouter = express.Router()

// get all items
itemRouter.get('/', (req, res) => {
    itemModel.find()
    .then(items => {
        res.send(items)
    })
    .catch(error => {
        console.log(error);
        res.status(500).send({ message: error })
    })
})

// get an item by ID
itemRouter.get('/', (req, res) => {
    const itemID = req.params.id

    itemModel.findById(itemID)
    .then(item => {
        res.status(201).send(item)
    })
    .catch(error => {
        res.status(500).send(error)
    })
})

// create an item
itemRouter.post('/', (req, res) => {
    const item = req.body
    
    itemModel.create(item)
    .then(item => {
        res.status(201).send(item)
        console.log('item created successfully')
    })
    .catch(error => {
        res.status(500).send({ message: error })
        console.log(error);
    })
})


module.exports = itemRouter
