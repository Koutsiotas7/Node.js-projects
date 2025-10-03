const express = require("express");
const fetch = require("node-fetch"); 
const app = express();
const port = 3000;

const api_key = "37d65c74e42033d26680326a73ac65fa";

app.use(express.json());

app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;

  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return res.status(404).json({ error: "City is not found!!" });
    }

    const data = await response.json();

    res.json({
      city: data.name,
      country: data.sys.country,
      temperature: `${data.main.temp} °C`,
      feels_like: `${data.main.feels_like} °C`,
      description: data.weather[0].description,
      humidity: `${data.main.humidity} %`,
      wind_speed: `${data.wind.speed} m/s`
    });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: "Failed to fetch data." });
  }
});

app.listen(port, () => {
  console.log(`Weather API is running at http://localhost:${port}`);
});
