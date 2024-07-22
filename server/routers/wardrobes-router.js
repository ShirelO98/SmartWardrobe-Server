const { Router } = require("express");
const { wardrobesController } = require("../controllers/wardrobesController");

const wardrobesRouter = new Router();


wardrobesRouter.post("/", wardrobesController.createWardrobe);
wardrobesRouter.get("/:wardrobeCode", wardrobesController.getWardrobe);
wardrobesRouter.put("/:wardrobeCode", wardrobesController.updateWardrobeName);
wardrobesRouter.delete("/:wardrobeCode", wardrobesController.deleteWardrobe);

module.exports = { wardrobesRouter };