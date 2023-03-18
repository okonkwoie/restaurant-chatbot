const express = require("express");
const itemModel = require('../models/item_model')
const chatbotController = require('../controller/chatbot_controller')
const chatbotRouter = express.Router();

// welcome page
chatbotRouter.get('/', chatbotController.chatbotPage)

// user selects 1
chatbotRouter.post('/place-order', chatbotController.placeOrder)

// when user selects 99
chatbotRouter.post('/checkout-order', chatbotController.checkoutOrder)

//when user selects 98
chatbotRouter.get('/order-history', chatbotController.orderHistory)

// when user selects 97
chatbotRouter.get('/current-order', chatbotController.currentOrder)

//when the user selects 0
chatbotRouter.delete('/cancel-order', chatbotController.cancelOrder )



module.exports = chatbotRouter;
