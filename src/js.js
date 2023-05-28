// Current time
function showDate (timestamp) {
let now = new Date();
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

//Forecast
function formatDay(timestamp){
let date = new Date(timestamp *1000);
let days = ["Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"];
let day = days[date.getDay()];
return day;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function(forecastDay, index) {
    if (index > 0 && index < 7) {
  forecastHTML = forecastHTML + `<div class="col">
          <div class="bright" id="forecastDate">${formatDay(forecastDay.dt)}</div>
          <img src="img/${forecastDay.weather[0].main}.png" alt="Sunny" title="${forecastDay.weather[0].description}">
          <div class="temperature">
            <span class="degrees bright">${Math.round(forecastDay.temp.max)}</span><span class="bright">°</span> <span class="degrees">${Math.round(forecastDay.temp.min)}</span>°
          </div>
        </div>`;
        }
  });

        forecastHTML = forecastHTML + `</div>`
      forecastElement.innerHTML = forecastHTML;

}


// From Celsius to Fahrenheit
function showFahrenheit(event) {
event.preventDefault();
let temp = document.querySelector("#temperature");
let fahr = (celsiusTemperature * 9)/5+32;
temp.innerHTML = Math.round(fahr);
//  let degrees = document.querySelectorAll(".degrees");
//   degrees.forEach(function (degree) {
//     let celsiusTemp = degree.innerHTML;
//     let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
//     degree.innerHTML = Math.round(fahrenheitTemp);
//   });

celsius.classList.remove("active");
fahrenheit.classList.add("active");

}

  
  
  

function showCelsius (event) {
event.preventDefault();
let temp = document.querySelector("#temperature");
temp.innerHTML = Math.round(celsiusTemperature);
// let degrees = document.querySelectorAll(".degrees");
//   degrees.forEach(function (degree) {
//     let fahrenheitTemp = degree.innerHTML;
//     let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
//     degree.innerHTML = Math.round(celsiusTemp);
//   });
celsius.classList.add("active");
fahrenheit.classList.remove("active");
}

function getForecast(coordinates) {
  
  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(displayForecast);
}

// Display the city name on the page 
function showSelectedTemperature (response){
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#currentCondition").innerHTML = response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  let condition = response.data.weather[0].main;
  document.querySelector("#currentIcon").innerHTML = `<img src="img/${condition}.png" alt="${response.data.weather[0].description}" class="main-img" title="${response.data.weather[0].description}">`;
  document.querySelector(".weekday").innerHTML = showDate(response.data.dt *1000);
getForecast(response.data.coord);
}

function showCity(city){
  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=${units}`;
axios.get(apiUrl).then(showSelectedTemperature);
}

function searchCity (event){
event.preventDefault();
showCity(document.querySelector("#newCity").value);
}


// Current button: current position & current temperature
function showCurrentTemperature (response) {
    celsiusTemperature = response.data.main.temp;
    document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
  let condition = response.data.weather[0].main;
  document.querySelector("#currentCondition").innerHTML = `${condition}`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#currentIcon").innerHTML = `<img src="img/${condition}.png" alt="${response.data.weather[0].description}" class="main-img" title="${response.data.weather[0].description}">`;
getForecast(response.data.coord);
}

function showPosition (position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
   let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=${units}`
axios.get(apiUrl).then(showCurrentTemperature);
}
function turnNavigator () {
navigator.geolocation.getCurrentPosition(showPosition);
 alert(`A "Request to access location" will now appear. If not, remove the restriction in the device settings.`)
}
  document.querySelector(".btn-current").addEventListener("click", turnNavigator)
  document.querySelector("form").addEventListener("submit", searchCity)

let celsiusTemperature = null;
let fahrenheit = document.querySelector(".fahrenheit");
let celsius = document.querySelector(".celsius");
  celsius.addEventListener("click", showCelsius);
  fahrenheit.addEventListener("click", showFahrenheit);

showCity("Barcelona");