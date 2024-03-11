//Weather prompt
//--window.onload =
function cityWeather() {
  let weather = {
    paris: {
      temp: 19.7,
      humidity: 80,
    },
    tokyo: {
      temp: 17.3,
      humidity: 50,
    },
    lisbon: {
      temp: 30.2,
      humidity: 20,
    },
    "san francisco": {
      temp: 20.9,
      humidity: 100,
    },
    oslo: {
      temp: -5,
      humidity: 20,
    },
  };

  let city = prompt("Enter a city.").toLowerCase();

  if (weather[city] !== undefined) {
    let temperature = weather[city].temp;
    let humidity = weather[city].humidity;
    alert(
      `It is currently ${Math.round(temperature)}°C (${Math.round(
        (temperature * 9) / 5 + 32
      )}°F) in ${city} with a humidity of ${humidity}%`
    );
  } else {
    alert(
      `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+in+${city}`
    );
  }
}

//Present Time.
window.onload = function currentTime() {
  let date = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let hour = date.getHours();
  let minutes = date.getMinutes();

  document.querySelector(
    "#active-temp-date"
  ).innerHTML = `${day} ${hour}:${minutes}`;
};

//Search form function.
function search(event) {
  event.preventDefault();

  let searchCity = document.querySelector("#search-city-input");

  let city = (document.querySelector("#this-city").innerHTML =
    `${searchCity.value}`.toUpperCase());

  let apiKey = `a4321774f3fb52faa9dd8090c3do4t41`;

  //Weather API Query
  function searchWeather(response) {
    console.log(response.data);

    document.querySelector(`.activeTemp`).innerHTML = `${Math.round(
      response.data.temperature.current
    )}°F`;

    document.querySelector(`#condition-description`).innerHTML =
      response.data.condition.description;

    document.querySelector(
      `#humidity-percentage`
    ).innerHTML = `Humidity: ${response.data.temperature.humidity}%`;

    document.querySelector(
      `#active-temp-wind-speed`
    ).innerHTML = `Wind: ${Math.round(response.data.wind.speed)}mph`;
  }

  axios
    .get(
      `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`
    )
    .then(searchWeather);
}

document.querySelector("#search-form").addEventListener("submit", search);

function currentCityWeather(response) {
  console.log(response.data);

  document.querySelector(`.activeTemp`).innerHTML = `${Math.round(
    response.data.temperature.current
  )}°F`;

  document.querySelector(`#condition-description`).innerHTML =
    response.data.condition.description;

  document.querySelector(
    `#humidity-percentage`
  ).innerHTML = `Humidity: ${response.data.temperature.humidity}%`;

  document.querySelector(
    `#active-temp-wind-speed`
  ).innerHTML = `Wind: ${Math.round(response.data.wind.speed)}mph`;
}

axios
  .get(
    `https://api.shecodes.io/weather/v1/current?query=new-york&key=a4321774f3fb52faa9dd8090c3do4t41&units=imperial`
  )
  .then(currentCityWeather);

document
  .querySelector("#current-form")
  .addEventListener("submit", currentCityWeather);
