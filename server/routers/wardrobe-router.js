const { Router } = require("express");
const { wardrobeController } = require("../controllers/wardrobeController");

const wardrobeRouter = new Router();


wardrobeRouter.post("/", wardrobeController.createWardrobe);
wardrobeRouter.get("/:id", wardrobeController.getWardrobe);
wardrobeRouter.put("/:id", wardrobeController.updateWardrobeName);
wardrobeRouter.delete("/:id", wardrobeController.deleteWardrobe);

module.exports = { wardrobeRouter };