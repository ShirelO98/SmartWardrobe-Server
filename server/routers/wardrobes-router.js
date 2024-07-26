const { Router } = require("express");
const { wardrobesController } = require("../controllers/wardrobesController");

const wardrobesRouter = Router();


wardrobesRouter.post("/", wardrobesController.createWardrobe);
wardrobesRouter.get("/:wardrobeCode", wardrobesController.getWardrobe);
wardrobesRouter.get("/:userId", wardrobesController.getAllUserWardrobes);
wardrobesRouter.put("/:wardrobeCode", wardrobesController.updateWardrobeName);
wardrobesRouter.delete("/:wardrobeCode", wardrobesController.deleteWardrobe);

module.exports = { wardrobesRouter };