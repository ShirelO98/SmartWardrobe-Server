const { Router } = require("express");
const { stylistController } = require("../controllers/stylistController");
const stylistRouter = Router();

stylistRouter.get("/:stylistID", stylistController.getAllClients);
stylistRouter.put("/:lookId", stylistController.UpdateLookSendByStylist);
module.exports = { stylistRouter };
