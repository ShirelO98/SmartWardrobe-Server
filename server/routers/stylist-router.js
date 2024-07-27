const { Router } = require("express");
const { stylistController } = require("../controllers/userController");
const stylistRouter = Router();

stylistRouter.get("/:stylistID", stylistController.loginUser);

module.exports = { stylistRouter };
