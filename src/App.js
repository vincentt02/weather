import "./App.css";
import { useState } from "react";
import axios from "axios";

const API_KEY = "";

function App() {
  const [searchLocation, setSearchLocation] = useState("");
  const [displayLocations, setDisplayLocations] = useState(null);

  const [weatherLocation, setWeatherLocation] = useState("");
  const [weatherLocationData, setWeatherLocationData] = useState(null);

  const getLocations = () => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${searchLocation}&limit=10&appid=${API_KEY}`
      )
      .then((response) => {
        setDisplayLocations(response.data);
        console.log(response.data);
      });
  };

  const getWeatherData = (location) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=imperial`
      )
      .then((response) => {
        console.log(response.data);
        setWeatherLocationData(response.data);
      });
  };

  const pickedLocationHandler = (location) => {
    setWeatherLocation(location);
    getWeatherData(location);
    setDisplayLocations(null);
  };

  return (
    <div className="App">
      <div className="search_Container">
        <div className="searchBar">
          <input
            id="searchInput"
            type="text"
            value={searchLocation}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getLocations();
              }
            }}
            onChange={(e) => {
              setSearchLocation(e.target.value);
            }}
            // onFocus={() => {
            //   document.getElementById(
            //     "displayLocations_container"
            //   ).style.display = "flex";
            // }}
            // onBlur={() => {
            //   document.getElementById(
            //     "displayLocations_container"
            //   ).style.display = "none";
            // }}
            placeholder="Enter a city..."
          />

          <button id="searchButton" onClick={getLocations}>
            Search
          </button>
        </div>

        {displayLocations === null ? (
          ""
        ) : (
          <>
            <ul className="searchResults_container">
              {displayLocations.map((location) => {
                return (
                  <>
                    <li
                      className="searchResults"
                      key={location}
                      onClick={() => {
                        pickedLocationHandler(location);
                      }}
                    >
                      {location.name}
                      {location.state === undefined
                        ? ""
                        : `, ${location.state}`}
                      {location.country === "US" ? "" : `, ${location.country}`}
                    </li>
                  </>
                );
              })}
            </ul>
          </>
        )}
      </div>

      <div className="weather_Container">
        <div className="weatherInfo">
          {weatherLocationData === null ? (
            ""
          ) : (
            <>
              <div className="weatherInfo_Header">
                <div className="weatherLocation">
                  {weatherLocation.name}
                  {weatherLocation.state === undefined
                    ? ""
                    : `, ${weatherLocation.state}`}
                  {weatherLocation.country === "US"
                    ? ""
                    : `, ${weatherLocation.country}`}
                </div>
              </div>
              <div className="weatherInfo_Body">
                <div className="weather_temp">
                  {Math.ceil(weatherLocationData.main.temp)}&deg;
                </div>
                <div className="icon">
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherLocationData.weather[0].icon}@4x.png`}
                    alt=""
                  />
                </div>
                <div className="weather_tempmaxmin">
                  <div>Max {Math.ceil(weatherLocationData.main.temp_max)}</div>
                  <div>Min {Math.ceil(weatherLocationData.main.temp_min)}</div>
                </div>
                <div className="weather_feelslike_humidity">
                  <div>
                    Feels Like {Math.ceil(weatherLocationData.main.feels_like)}
                  </div>
                  <div>
                    Humidity {Math.ceil(weatherLocationData.main.humidity)}
                  </div>
                </div>
                <div className="weather_description">
                  {weatherLocationData.weather[0].main}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
