
const { Router } = require("express");
const {loginUser } = require("../controllers/userController");
const userRouter = new Router();

userRouter.post("/login",loginUser ); 


module.exports = { userRouter };
