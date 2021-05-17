let now = new Date();

let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentDate = document.querySelector("#current-Date");
let currentTime = document.querySelector("#current-Time");

let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

currentDate.innerHTML = `${day}, ${month} ${date}, ${year}`;
if (hour > 12) {
  currentTime.innerHTML = `${hour - 12}:${minutes} PM`;
} else {
  currentTime.innerHTML = `${hour}:${minutes} AM`;
}

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function findCity(event) {
  event.preventDefault();
  let enteredCity = document.querySelector("#city-Search");
  let searchLocation = document.querySelector("#current-City");
  searchLocation.innerHTML = `${enteredCity.value}`;
  search(enteredCity.value);
}

function showForecast() {
  let forecastElement = document.querySelector("#weekdayForecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
     <div class="weather-forecast-date">${day}</div>
      </br>
       <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
      </br>
     <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          </br>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
    </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTemp(response) {
  let searchedTemp = document.querySelector("#searchedTemp");
  let temperature = Math.round(response.data.main.temp);
  let searchLocation = document.querySelector("#current-City");
  let descriptionElement = document.querySelector("#current-condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#currentIcon");

  celsiusTemp = response.data.main.temp;

  searchedTemp.innerHTML = `${temperature}`;
  searchLocation.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let searchedTemp = document.querySelector("#searchedTemp");
  searchedTemp.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let searchedTemp = document.querySelector("#searchedTemp");
  searchedTemp.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let searchCity = document.querySelector("#enter-City");
searchCity.addEventListener("submit", findCity);

function currentLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "47424339c9594cae7bd784ef33257c7e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentWeather = document.querySelector("#current-location-button");
currentWeather.addEventListener("click", getCurrentLocation);

search("Detroit");
showForecast();
