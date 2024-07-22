
const { Router } = require("express");
const { userController } = require("../controllers/userController");
const userRouter = new Router();

userRouter.post("/login", userController.addWardrobe); 


module.exports = { userRouter };
