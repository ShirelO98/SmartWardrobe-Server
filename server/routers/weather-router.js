const { Router } = require("express");
const {  getWeatherData } = require("../controllers/weatherController");
const weatherRouter = Router();

lookRouter.get("/:cityName", lookController.getAllLooks);

module.exports = { weatherRouter };
