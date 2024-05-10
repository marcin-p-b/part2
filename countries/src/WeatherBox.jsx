import React from "react";

export default function WeatherBox({ weatherData }) {
  return (
    <div>
      <h2>Weather in {weatherData.name}</h2>
      <p>temperature {(weatherData.main.temp - 272.15).toFixed(2)} Celsius</p>
      <img
        className="weather-img"
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt=""
      />
      <p>wind {weatherData.wind.speed.toFixed(1)} m/s</p>
    </div>
  );
}
