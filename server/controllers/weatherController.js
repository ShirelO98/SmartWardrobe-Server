const axios = require("axios");
const WEATHER_KEY = process.env.WEATHER_KEY;
const getWeatherData = async (req, res) => {
  try {
    const { cityName } = req.params;
    if (!cityName) {
      return res.status(400).json({ error: "Please provide a city name" });
    }

    const cityData = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${WEATHER_KEY}`
    );
    if (cityData.data.length === 0) {
      return res.status(404).json({ error: "City not found" });
    }
    const { lat, lon } = cityData.data[0];
    const weatherResponse = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`
    );
    res.json(weatherResponse.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};

module.exports = { getWeatherData };
