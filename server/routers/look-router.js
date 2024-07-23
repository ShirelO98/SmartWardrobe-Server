const { Router } = require("express");
const { lookController, } = require("../controllers/lookController");
const lookRouter = Router();

look.get("/:wardrobeCode", lookController.getAllLooks);
look.get("/:wardrobeCode/:filterLook", lookController.getLook);
itemRouter.delete("/:look", lookController.deleteLook);

module.exports = { lookRouter };
