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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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

    document.querySelector(
      ".currentCityIcon"
    ).innerHTML = `<img class="activeIcon" src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png" width="140px" />`;

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

let city = prompt(`Enter your city.`);

function currentCityWeather(response) {
  console.log(response.data);

  document.querySelector(
    ".currentCityIcon"
  ).innerHTML = `<img class="activeIcon" src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png" width="140px" />`;

  document.querySelector("#this-city").innerHTML =
    response.data.city.toUpperCase();

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
    `https://api.shecodes.io/weather/v1/current?query=${city}&key=a4321774f3fb52faa9dd8090c3do4t41&units=imperial`
  )
  .then(currentCityWeather);

document
  .querySelector("#current-form")
  .addEventListener("submit", currentCityWeather);
