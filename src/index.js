function refreshCurrentWeather(response) {
  console.log(response.data);
  let currentTemperatureElement = document.querySelector(
    "#weather-current-temperature"
  );
  let currentTemperature = response.data.temperature.current;
  currentTemperatureElement.innerHTML = Math.round(currentTemperature);
}

function refreshCurrentCity(response) {
  let cityElement = document.querySelector("#weather-current-city");
  cityElement.innerHTML = response.data.city;
}

function searchCity(searchValue) {
  city = searchValue.trim(); //.replaceAll(" ", "+");
  let apiKey = "93aa3f2e40748o3cacebbc6bct7b0422";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshCurrentCity);
  axios.get(apiUrl).then(refreshCurrentWeather);
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
