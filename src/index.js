let now = new Date();

let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
let minutes = now.getMinutes();

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

function showTemp(response) {
  let searchedTemp = document.querySelector("#searchedTemp");
  let temperature = Math.round(response.data.main.temp);
  searchedTemp.innerHTML = `${temperature}`;
  let searchLocation = document.querySelector("#current-City");
  let descriptionElement = document.querySelector("#current-condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  searchLocation.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.main.wind.speed);
}

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
