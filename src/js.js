
// Current time
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

let weekday = document.querySelector(".weekday");
weekday.innerHTML = `${day} ${currentTime}`;



// Display the city name on the page 
function showSelectedWeather (response){
  document.querySelector("#currentCity").innerHTML = response.data.name;
  let currentTemperature = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#temperature");
  degrees.innerHTML = `${currentTemperature}`;
  let condition = response.data.weather[0].main;
  let currentCondition = document.querySelector("#currentCondition");
  currentCondition.innerHTML = `${condition}`
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`
  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind: ${wind} m/s`;
  let currentIcon = document.querySelector("#currentIcon");
  currentIcon.innerHTML = `<img src="img/${condition}.png" alt="Sunny" class="main-img">`;
}


function searchCity (event){
   event.preventDefault();
  let newCity = document.querySelector("#newCity");
  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
let city = newCity.value;
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=${units}`;
axios.get(apiUrl).then(showSelectedWeather);

}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity)



// From Celsius to Fahrenheit

// function showCelsius(event) {
//   event.preventDefault();
//   let temp = document.querySelector("#temperature");
//   let cels = temp.innerHTML;
//   cels = 20;
//   temp.innerHTML = `${cels}`;
// }

// let celsius = document.querySelector(".celsius");
// celsius.addEventListener("click", showCelsius);

// function showFahrenheit(event) {
//   event.preventDefault();
//   let temp = document.querySelector("#temperature");
//    let cels = temp.innerHTML;
//   cels = Number(cels);
//   let fahr = Math.round((cels * 9) / 5 + 32);

//   temp.innerHTML = `${fahr}`;
// }

// let fahrenheit = document.querySelector(".fahrenheit");
// fahrenheit.addEventListener("click", showFahrenheit);

// Current button: current position & current temperature
function showTemperature (response) {
  let city = response.data.name;
  let currentTemperature = Math.round(response.data.main.temp);
  let currentCity = document.querySelector("#currentCity");
  currentCity.innerHTML = `${city}`;
  let degrees = document.querySelector("#temperature");
  degrees.innerHTML = `${currentTemperature}`;
  let condition = response.data.weather[0].main;
  let currentCondition = document.querySelector("#currentCondition");
  currentCondition.innerHTML = `${condition}`
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`
  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind: ${wind} m/s`;
  let currentIcon = document.querySelector("#currentIcon");
  currentIcon.innerHTML = `<img src="img/${condition}.png" alt="Sunny" class="main-img">`;
 
}

function showPosition (position) {
 
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
   let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=${units}`
 axios.get(apiUrl).then(showTemperature);
}
function turnNavigator () {
navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector(".btn-current");
  currentButton.addEventListener("click", turnNavigator)
  






  