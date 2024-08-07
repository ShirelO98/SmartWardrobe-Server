const axios = require("axios");
const WEATHER_KEY = process.env.WEATHER_KEY;
const weatherCodeApiDesc = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light rain",
  53: "Moderate rain",
  55: "Heavy rain",
  56: "Light freezing rain",
  57: "Heavy freezing rain",
  61: "Showers of rain",
  63: "Moderate showers of rain",
  65: "Heavy showers of rain",
  66: "Light snow showers",
  67: "Heavy snow showers",
  71: "Light snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  77: "Snow grains",
  80: "Light rain showers",
  81: "Moderate rain showers",
  82: "Heavy rain showers",
};
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
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );
    const currentWeather = weatherResponse.data.current_weather;
    const weatherDescription =
      weatherCodeApiDesc[currentWeather.weathercode] || "Unknown weather";

    res.json({
      temperature: currentWeather.temperature,
      weather_description: weatherDescription,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};

module.exports = { getWeatherData };
