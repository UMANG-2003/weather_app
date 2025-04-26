"use client";
import React, { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchCity = async (cityInput) => {
    setLoading(true);
    setError("");
    setCity(cityInput);

    const options = {
      method: "GET",
      url: `https://open-weather13.p.rapidapi.com/city/${cityInput}/EN`,
      headers: {
        // process.env.REACT_APP_RAPIDAPI_KEY
        "x-rapidapi-key": "9d9680b786mshb2fe71d95d8f13cp1796f6jsn9d0905217bfb",
        "x-rapidapi-host": "open-weather13.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      setError("City not found or failed to fetch weather data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const convertUnixToTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleTimeString();
  };

  return (
    <>
      <form
        className="mx-auto flex justify-center my-5"
        onSubmit={(e) => {
          e.preventDefault();
          const cityInput = e.target.elements.city.value;
          searchCity(cityInput);
          e.target.reset();
        }}
      >
        <div className="border-2 border-gray-300 rounded-3xl">
          <input
            type="search"
            placeholder="search city"
            name="city"
            className="bg-black p-2 px-3 w-[60vw] rounded-l-3xl"
            required
          />
          <button type="submit" className="bg-pink-600 p-2 rounded-r-3xl px-3">
            search
          </button>
        </div>
      </form>

      {error && (
        <p className="text-center text-red-500 font-semibold mt-[-10px]">
          {error}
        </p>
      )}

      <div className="bg-white h-[78vh] w-[90vw] mx-auto my-10 rounded-3xl text-black p-4 relative overflow-hidden md:w-[25%]">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10 rounded-3xl">
            <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div
          className={`${
            loading ? "opacity-30 pointer-events-none select-none" : ""
          }`}
        >
          <div className="cityname">
            {data && (
              <div className="bg-purple-500 p-2 rounded-3xl">
                <p className="text-center font-bold text-2xl text-white">
                  {city.toUpperCase()}
                </p>
              </div>
            )}
          </div>

          <img src="/pic1.png" className="w-36 mx-auto" alt="" />

          {data && (
            <div>
              <p className="text-center text-3xl font-bold">
                {Math.round(((data.main.temp - 32) * 5) / 9)} °C
              </p>
            </div>
          )}

          {data && (
            <div className="weather-container w-full h-[33vh] mt-8 bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg rounded-3xl px-2 py-4 text-sm text-white">
              <table className="w-full rounded-2xl overflow-hidden">
                <tbody className="font-bold">
                  <tr className="bg-blue-600 bg-opacity-30 rounded-lg">
                    <td className="px-4 py-2 font-semibold">
                      Weather: {data.weather[0].main}
                    </td>
                    <td className="px-4 py-2 font-semibold">
                      Country: {data.sys.country}
                    </td>
                  </tr>
                  <tr className="rounded-md">
                    <td className="px-4 py-2">
                      Wind speed: {Math.round(data.wind.speed * 3.6)} km/h
                    </td>
                    <td className="px-4 py-2">Clouds: {data.clouds.all}%</td>
                  </tr>
                  <tr className="rounded-md">
                    <td className="px-4 py-2">
                      Feels like:{" "}
                      {Math.round(((data.main.feels_like - 32) * 5) / 9)} °C
                    </td>
                    <td className="px-4 py-2">
                      Max Temp:{" "}
                      {Math.round(((data.main.temp_max - 32) * 5) / 9)} °C
                    </td>
                  </tr>
                  <tr className="rounded-md">
                    <td className="px-4 py-2">
                      Sunrise: {convertUnixToTime(data.sys.sunrise)}
                    </td>
                    <td className="px-4 py-2">
                      Sunset: {convertUnixToTime(data.sys.sunset)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Weather;
