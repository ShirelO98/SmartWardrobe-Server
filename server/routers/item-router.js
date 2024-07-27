const { Router } = require("express");
const { itemController, } = require("../controllers/itemController");
const itemRouter = Router();

itemRouter.get("/:wardrobeCode", itemController.getAllItems);
itemRouter.get("/:wardrobeCode/:filter", itemController.getFilteredItems);
itemRouter.delete("/:itemId", itemController.deleteItem);
itemRouter.put("/:itemId",itemController.updateStatus);

module.exports = { itemRouter };
