import React from "react";
import WeatherBox from "./WeatherBox";

export default function CountryCard({ filteredCountry, weatherData }) {
  if (weatherData !== "") {
    return (
      <div>
        <div>
          <h1>{filteredCountry.name.common}</h1>
          <p>
            capital {filteredCountry.capital} <br /> area {filteredCountry.area}
          </p>
        </div>
        <div>
          <h2>languages</h2>
          <ul className="languages">
            {Object.values(filteredCountry.languages).map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
          <img src={filteredCountry.flags.png} alt="" />
        </div>
        <WeatherBox weatherData={weatherData} />
      </div>
    );
  } else return <></>;
}
