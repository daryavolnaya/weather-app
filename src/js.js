
// Current time
function showDate (timestamp) {
let now = new Date;
let days = ["Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"];
let day = days[now.getDay()];
let currentHours = now.getHours();
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
currentMinutes = `0${currentMinutes}`
};
let currentTime = (`${currentHours}:${currentMinutes}`);
return`${day} ${currentTime}`;
}

// From Celsius to Fahrenheit
function showFahrenheit(event) {
event.preventDefault();
let temp = document.querySelector("#temperature");
let fahr = (celsiusTemperature * 9)/5+32;
temp.innerHTML = Math.round(fahr);
celsius.classList.remove("active");
fahrenheit.classList.add("active");
}
function showCelsius (event) {
event.preventDefault();
let temp = document.querySelector("#temperature");
temp.innerHTML = Math.round(celsiusTemperature);
celsius.classList.add("active");
fahrenheit.classList.remove("active");
}

// Display the city name on the page 
function showSelectedWeather (response){
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#currentCondition").innerHTML = response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  let condition = response.data.weather[0].main;
  document.querySelector("#currentIcon").innerHTML = `<img src="img/${condition}.png" alt="${response.data.weather[0].description}" class="main-img">`;
  document.querySelector(".weekday").innerHTML = showDate(response.data.dt *1000);
}

function showCity(city){
  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=${units}`;
axios.get(apiUrl).then(showSelectedWeather);
}

function searchCity (event){
event.preventDefault();
showCity(document.querySelector("#newCity").value);
}


// Current button: current position & current temperature
function showTemperature (response) {
    celsiusTemperature = response.data.main.temp;
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
  let condition = response.data.weather[0].main;
  document.querySelector("#currentCondition").innerHTML = `${condition}`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#currentIcon").innerHTML = `<img src="img/${condition}.png" alt="${response.data.weather[0].description}" class="main-img">`;
}

function showPosition (position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
   let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=${units}`;
axios.get(apiUrl).then(showTemperature);
}
function turnNavigator () {
navigator.geolocation.getCurrentPosition(showPosition);
}
  document.querySelector(".btn-current").addEventListener("click", turnNavigator)
  document.querySelector("form").addEventListener("submit", searchCity)

let celsiusTemperature = null;
let fahrenheit = document.querySelector(".fahrenheit");
let celsius = document.querySelector(".celsius");
  celsius.addEventListener("click", showCelsius);
  fahrenheit.addEventListener("click", showFahrenheit);

showCity("Barcelona");




  