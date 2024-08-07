const { Router } = require("express");
const { getWeatherData } = require("../controllers/weatherController");
const weatherRouter = Router();

weatherRouter.get("/:cityName", getWeatherData);

module.exports = { weatherRouter };
