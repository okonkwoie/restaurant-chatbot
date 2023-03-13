const express = require("express");
const itemModel = require('../models/item_model')
const chatbotRouter = express.Router();

chatbotRouter.get('/', (req, res) => {
  if (req.session) {
    const sessionId = req.session.id; // Get the session ID
    const sessionData = req.session.data; // Get any session data

    res.send(
      `Welcome back! Your session ID: ${sessionId}, Your data: ${sessionData}`
    );
  } else {
    const welcomeMessage = "Welcome to Chops and Grills";

    const options = [
      "Select 1 to Place an order",
      "Select 99 to checkout order",
      "Select 98 to see order history",
      "Select 97 to see current order",
      "Select 0 to cancel order",
    ];

    const message = welcomeMessage + "\n" + "\n" + options.join("\n");
    res.render('chatbot', { messages: message });
  }
});

chatbotRouter.post('/', async (req, res) => {
   const message = req.body.message
   const session = req.session

   // If the user enters "1"
   if (message === "1") {
    try {
      // Get the list of items from MongoDB
      const items = await itemModel.find()
  
      // Build a message containing the list of items
      const itemOptions = items.map((item, index) => {
        return `${index + 1}. ${item.name} ($${item.price})`;
      });

      const output = `Select an item to add to your order:\n${itemOptions.join("\n")}`;
      console.log(output);
      res.send({ message: output });

    } catch (error) {
      console.log(error);
      res.json({ message: "An error occurred" });
    }
  }

  // if the user enters "99"
  
})


module.exports = chatbotRouter;
