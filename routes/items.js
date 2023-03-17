const express = require('express')
const itemController = require('../controller/item_controller')

const itemRouter = express.Router()

// get all items
itemRouter.get('/', itemController.getAllItems)

// get an item by ID
itemRouter.get('/:id', itemController.getItemByID)

// create an item
itemRouter.post('/', itemController.addItem)


module.exports = itemRouter
