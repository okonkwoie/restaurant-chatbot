const itemModel = require("../models/item_model");

function getAllItems(req, res) {
  itemModel
    .find()
    .then((items) => {
      res.send(items);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: error });
    });
}

function getItemByID(req, res) {
  const itemID = req.params.id;

  itemModel
    .findById(itemID)
    .then((item) => {
      res.status(201).send(item);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

function addItem(req, res) {
  const item = req.body;

  itemModel
    .create(item)
    .then((item) => {
      res.status(201).send(item);
      console.log("item created successfully");
    })
    .catch((error) => {
      res.status(500).send({ message: error });
      console.log(error);
    });
}

module.exports = {
  getAllItems,
  getItemByID,
  addItem,
};
