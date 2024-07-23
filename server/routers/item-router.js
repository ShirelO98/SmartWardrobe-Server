const { Router } = require("express");
const {
  getAllItems,
  getFilteredItems,
  deleteItem,
} = require("../controllers/itemController");
const itemRouter = Router();

itemRouter.get("/:wardrobeCode", getAllItems);
itemRouter.get("/:wardrobeCode/:filter", getFilteredItems);
itemRouter.delete("/:item_id", deleteItem);
module.exports = { itemRouter };
