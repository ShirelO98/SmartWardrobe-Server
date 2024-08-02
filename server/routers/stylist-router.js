const { Router } = require("express");
const { stylistController } = require("../controllers/stylistController");
const stylistRouter = Router();

stylistRouter.get("/:stylistID", stylistController.getAllClients);
module.exports = { stylistRouter };
