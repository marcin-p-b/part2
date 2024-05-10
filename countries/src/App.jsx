import { useState, useEffect } from "react";
import CountryCard from "./CountryCard";
import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/";
const VITE_API_URL = import.meta.env.VITE_API_URL;
const VITE_API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [data, setData] = useState("");
  const [filteredCountry, setFilteredCountry] = useState({
    list: [],
  });
  const [show, setShow] = useState(false);
  const [showCountry, setShowCountry] = useState({
    list: [],
  });
  const [weatherData, setWeatherData] = useState("");

  const handleChange = (e) => {
    const userInput = e.target.value;
    const results = data.filter((d) => {
      if (userInput === "") return "Too many matches, specify another filter";
      return d.name.common.toLowerCase().includes(userInput.toLowerCase());
    });
    setFilteredCountry({
      list: results,
    });
  };

  const handleShow = (c) => {
    setShowCountry({ list: c });
    setShow(!show);
  };

  const onFocus = () => {
    setShow(false);
  };

  useEffect(() => {
    axios.get(`${baseUrl}api/all`).then((response) => setData(response.data));
  }, []);

  useEffect(() => {
    if (filteredCountry.list.length === 1 || show) {
      axios
        .get(
          `${VITE_API_URL}/weather?q=${
            typeof showCountry.list.length !== "undefined"
              ? filteredCountry.list[0].capital
              : showCountry.list.capital
          }&appid=${VITE_API_KEY}`
        )
        .then((response) => setWeatherData(response.data));
    }
  }, [filteredCountry.list.length === 1, show]);

  return (
    <>
      <div className="search-container">
        <p>find countries</p>
        <input type="text" onChange={handleChange} onFocus={onFocus} />
      </div>
      <ul>
        {filteredCountry.list.length <= 10 &&
        filteredCountry.list.length !== 1 &&
        show === false ? (
          filteredCountry.list.map((c, i) => (
            <li key={i}>
              {c.name.common}{" "}
              <button onClick={() => handleShow(c)}>show</button>
            </li>
          ))
        ) : filteredCountry.list.length === 1 || show === true ? (
          <CountryCard
            filteredCountry={
              show === true ? showCountry.list : filteredCountry.list[0]
            }
            weatherData={weatherData}
          />
        ) : (
          <li>Too many matches, specify another filter</li>
        )}
      </ul>
    </>
  );
}

export default App;
