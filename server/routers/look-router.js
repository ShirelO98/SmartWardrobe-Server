const { Router } = require("express");
const { lookController, } = require("../controllers/lookController");
const lookRouter = Router();

lookRouter.get("/:wardrobeCode", lookController.getAllLooks);
lookRouter.get("/:wardrobeCode/:lookId", lookController.getLook);
lookRouter.delete("/:lookId", lookController.deleteLook);

module.exports = { lookRouter };
