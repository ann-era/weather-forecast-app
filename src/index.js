function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `
        <div class="weather-forecast-container">
          <div class="weather-forecast-day">${formatForecastDay(day.time)}</div>
          <div class="weather-forecast-icon">
            <img
              src="${day.condition.icon_url}"
              alt="${day.condition.description}"
              title="${day.condition.description}"
              class="weather-forecast-icon"
            />
          </div>
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}°</strong>
            </div>
            <div class="weather-forecast-temperature">
              ${Math.round(day.temperature.minimum)}°
            </div>
          </div>
        </div>
      `;
    }
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

function getForecast(city) {
  let apiKey = "93aa3f2e40748o3cacebbc6bct7b0422";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(displayForecast);
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

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
  currentWeatherIconElement.innerHTML = `
    <img
      src="${response.data.condition.icon_url}"
      alt="${response.data.condition.description}"
      title="${response.data.condition.description}"
      class="weather-current-icon"
    />`;
  currentTemperatureElement.innerHTML = Math.round(currentTemperature);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  getForecast(response.data.city);
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
displayForecast();
