
const { Router } = require("express");
const { userController } = require("../controllers/userController");
const userRouter = new Router();

userRouter.get("/", userController.getWardrobes);
userRouter.post("/wardrobe/:name", userController.addWardrobe); 
userRouter.put("/:wardrobeID", userController.updateWardrobe); 
userRouter.delete("/:wardrobeID", userController.deleteWardrobe); 

module.exports = { userRouter };
