const { Router } = require("express");
const { wardrobeController } = require("../controllers/wardrobeController");

const wardrobeRouter = new Router();


wardrobeRouter.post("/", wardrobeController.createWardrobe);
wardrobeRouter.get("/:wardrobeCode", wardrobeController.getWardrobe);
wardrobeRouter.put("/:wardrobeCode", wardrobeController.updateWardrobeName);
wardrobeRouter.delete("/:wardrobeCode", wardrobeController.deleteWardrobe);

module.exports = { wardrobeRouter };