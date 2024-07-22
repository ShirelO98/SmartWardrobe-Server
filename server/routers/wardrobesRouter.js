const { Router } = require("express");
const {getWardrobes } = require("../controllers/userController");
const wardrobesRouter = new Router();

wardrobesRouter.get("/:user_id",getWardrobes); 


module.exports = { wardrobesRouter };
