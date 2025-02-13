function refreshCurrentInfo(response) {
  let cityElement = document.querySelector("#weather-current-city");
  let timeElement = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  let currentWeatherIconElement = document.querySelector(
    "#weather-current-icon"
  );
  let currentTemperatureElement = document.querySelector(
    "#weather-current-temperature"
  );
  let currentTemperature = response.data.temperature.current;
  let descriptionElement = document.querySelector(
    "#weather-current-description"
  );
  let humidityElement = document.querySelector("#weather-current-humidity");
  let windElement = document.querySelector("#weather-current-wind");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  currentWeatherIconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-current-icon" />`;
  currentTemperatureElement.innerHTML = Math.round(currentTemperature);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(searchValue) {
  city = searchValue.trim();
  let apiKey = "93aa3f2e40748o3cacebbc6bct7b0422";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshCurrentInfo);
}

function submitSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submitSearch);

//set default city
searchCity("Ranau");
