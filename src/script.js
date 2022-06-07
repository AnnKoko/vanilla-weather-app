let date = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[date.getDay()];

let year = date.getFullYear();
let month = date.getMonth() + 1;
let dayDate = date.getDate();

let hour = date.getHours();
let mins = ("00" + date.getMinutes()).slice(-2);

let currDate = document.querySelector(".curr-date");
currDate.innerHTML = `${day} ${year}/${dayDate}/${month} ${hour}:${mins}`;

function findCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector(".search-field");

  let apiKey = "c41dde6a22dbf0c22ac4f8f5d1f06111";
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=metric`
    )
    .then(showCurrWeather);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", findCity);

function showCurrWeather(response) {
  let weatherData = response.data;
  console.log(weatherData);
  let currLocation = weatherData.name,
    description = weatherData.weather[0].description,
    humidility = weatherData.main.humidity,
    temp = Math.round(weatherData.main.temp),
    wind = weatherData.wind.speed;

  let cityName = document.querySelector(".city-name");
  cityName.innerHTML = currLocation;
  let currTemp = document.querySelector("#curr-temp");
  currTemp.innerHTML = temp;
  let weatherDesc = document.querySelector("#weather-desc");
  weatherDesc.innerHTML = description;
  let weatherHum = document.querySelector("#weather-hum");
  weatherHum.innerHTML = humidility;
  let weatherWind = document.querySelector("#weather-wind");
  weatherWind.innerHTML = wind;
}

function handlePosition(position) {
  let apiKey = "c41dde6a22dbf0c22ac4f8f5d1f06111";
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`
    )
    .then(showCurrWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currPosition = document.querySelector(".curr-pos");
currPosition.addEventListener("click", getCurrentPosition);
