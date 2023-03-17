const itemModel = require('../models/item_model')

function chatbotPage(req, res){
    if (!req.session.deviceId) {
        req.session.deviceId = req.headers['user-agent'];
        console.log(req.session)
      } 
    
        const welcomeMessage = "Welcome to Chops and Grills";
    
        const options = [
          "Select 1 to Place an order",
          "Select 99 to checkout order",
          "Select 98 to see order history",
          "Select 97 to see current order",
          "Select 0 to cancel order",
        ];
    
        const message = welcomeMessage + "\n" + "\n" + options.join("\n");
        res.status(200).send(message);
}

async function placeOrder(req, res){
    const userMessage = req.body.message;

  if (userMessage === "1") {
    // Retrieve menu items from MongoDB and store in session
    try {
      const menuItems = await itemModel.find();
      const itemList = menuItems.map((item, index) => `${index + 1}. ${item.name} - (${item.price})`);
      req.session.menuItems = menuItems; //storing menu item into the session

      const message = "Please select an item number to order:" + "\n" + "\n" + itemList.join("\n");
      res.status(200).json({ message: message, session: req.session });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving menu items" });
    }

  } else if (req.session.menuItems && !isNaN(userMessage) && userMessage > 0 && userMessage <= req.session.menuItems.length) {
    // User selected an item number, store in session
    const itemIndex = parseInt(userMessage) - 1 

    if (req.session.menuItems[itemIndex]) {
      const selectedItem = req.session.menuItems[itemIndex]
      req.session.selectedItem = selectedItem;
      const message = `You selected ${selectedItem.name}. Type "99" to proceed to checkout`;
      res.status(200).json({ message: message, session: req.session });

    } else {
      const message = "Invalid item number. Please select again:";
      res.status(200).json({ message: message, session: req.session });
    }
  }
}

function checkoutOrder(req, res){
    const userMessage = req.body.message

  if (userMessage === "99") {
     const selectedItem = req.session.selectedItem
     const order = {
      item: selectedItem.name,
      price: selectedItem.price
     }

    // add the order to the session
    if (!req.session.orders) {
      req.session.orders = [order];
    } else {
      req.session.orders.push(order);
    }

    req.session.order = order //saving user's order into session
    const message = `Your order ${selectedItem.name} is placed! Type "1" to place new order`
    res.status(200).json({ message: message, session: req.session})

  } else {
    const message = `No order to place`
    res.status(404).json({ message: message })
  }
}

function orderHistory(req, res){
    const userMessage = req.body.message

   if(userMessage === "98"){
    const orders = req.session.orders

    if (orders && orders.length > 0){
      const orderList = orders.map((order) => `${order.item} - ${order.price}`).join('\n');
      const message = `order history:\n\n${orderList}\n\n`
      res.status(200).json({ message: message, session: req.session })

    } else {
      const message = `No placed orders, type "1" to place an order`
      res.json({ message: message, session: req.session })
    }
   }
}

function currentOrder(req, res){
    const userMessage = req.body.message

  if (userMessage === "97"){
    const order = req.session.order
    if(order){
      const message = `Your current order is: ${order.item} - (${order.price})`
      res.status(200).json({ message: message, session: req.session })
    } else {
      const message = `No current order, type "1" to place an order`
      res.status(200).json({ message: message, session: req.session })
    }
  } else {
    const message = `Invalid input`
    res.status(404).json({ message: message, session: req.session })
  }
}

function cancelOrder(req, res){
    const userMessage = req.body.message

  if(userMessage === "0"){
    if(req.session.order){
      delete req.session.order 
      const message = `order cancelled, type "1" to place new order`
      res.status(200).json({ message: message, session: req.session })
    } else {
      const message = `No order to cancel`
      res.status(200).json({ message: message, session: req.session })
    }
  }
}

module.exports = {
    chatbotPage,
    placeOrder,
    checkoutOrder, 
    orderHistory,
    currentOrder,
    cancelOrder
}