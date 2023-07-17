import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WheaterApp.css";
// import { Menu } from "@mui/material";
import Menu from "./Menu";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = "38bfda8f2d7ed069d76b0fbf680d8798";

  useEffect(() => {
    getCurrentLocation();
    const interval = setInterval(getCurrentLocation, 10000); // Appel à getCurrentLocation toutes les 10 secondes
    return () => {
      clearInterval(interval); // Nettoyage de l'intervalle lors du démontage du composant
    };
  }, []);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude, longitude } = position.coords;
        getWeatherData(latitude, longitude);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  const getWeatherData = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatTemperature = (temp) => {
    return `${Math.round(temp - 273.15)}°C`; // Conversion de Kelvin à Celsius et arrondi
  };

  const getIconUrl = (icon) => {
    return `http://openweathermap.org/img/wn/${icon}.png`;
  };

  return (
    <>
      <Menu />
      <div className="weather-container">
        <h1 className="weather-title">WeatherApp</h1>
        {weatherData && (
          <div className="weather-data">
            <div className="location">{weatherData.name}</div>
            <div className="weather-description">
              <img
                src={getIconUrl(weatherData.weather[0].icon)}
                alt={weatherData.weather[0].description}
                className="weather-icon"
              />
              <div>{weatherData.weather[0].description}</div>
            </div>
            <div className="temperature">
              Temperature: {formatTemperature(weatherData.main.temp)}
            </div>
            <div className="other-details">
              <div>
                Feels Like: {formatTemperature(weatherData.main.feels_like)}
              </div>
              <div>Pressure: {weatherData.main.pressure} hPa</div>
              <div>Humidity: {weatherData.main.humidity}%</div>
              <div>Wind Speed: {weatherData.wind.speed*3.6} km/h</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherApp;
