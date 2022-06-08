function findCityAPI(cityName){
  let apiKey = "c41dde6a22dbf0c22ac4f8f5d1f06111";
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    )
    .then(showCurrWeather);
}

function findCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector(".search-field");

  findCityAPI(inputCity.value)
}

function showCurrWeather(response) {
  let weatherData = response.data;

  let currLocation = weatherData.name,
    description = weatherData.weather[0].description,
    humidility = weatherData.main.humidity,
    temp = Math.round(weatherData.main.temp),
    wind = weatherData.wind.speed,
    image = weatherData.weather[0].icon;

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
  let imageEl = document.querySelector("#icon");

  let imgLink = `https://openweathermap.org/img/wn/${image}@2x.png`;
  switch(image){
    case "01n":
      imgLink = "images/sunny.png";
      break;
    case "04d":
      imgLink = "images/partly_cloudy.png";
      break;
    case "04n":
      imgLink = "images/sunny_s_cloudy.png";
      break;
    case "10n":
      imgLink = "images/rain_light.png";
      break;
    default:
      break;
  }

  imageEl.setAttribute("src", imgLink);
  celcisuisTemperature = temp;
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

function showFanrenheit(event){
  event.preventDefault();
  let fahrenheitD = Math.round((celcisuisTemperature * 9/5) + 32);
  let currentTemp = document.querySelector("#curr-temp");
  currentTemp.innerHTML = fahrenheitD;

  document.querySelector("#celc-link").classList.remove("active");
  document.querySelector("#fahrenheit-link").classList.add("active");
}

function showCelc(event){
  event.preventDefault();
  let currentTemp = document.querySelector("#curr-temp");
  currentTemp.innerHTML = celcisuisTemperature;

  document.querySelector("#fahrenheit-link").classList.remove("active");
  document.querySelector("#celc-link").classList.add("active");
}

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

let form = document.querySelector("#search-city");
form.addEventListener("submit", findCity);

let currPosition = document.querySelector(".curr-pos");
currPosition.addEventListener("click", getCurrentPosition);

let celcisuisTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFanrenheit);

let celcLink = document.querySelector("#celc-link");
celcLink.addEventListener("click", showCelc);

findCityAPI("Toronto");
