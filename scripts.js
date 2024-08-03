document
  .getElementById("fetchData")
  .addEventListener("click", fetchGeolocation);

function fetchGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function success(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;

  // Update UI
  document.getElementById("landing-page").classList.add("hidden");
  document.getElementById("weather-page").classList.remove("hidden");
  document.getElementById("lat").innerText = `Lat: ${lat}`;
  document.getElementById("long").innerText = `Long: ${long}`;

  // Display map
  displayMap(lat, long);

  // Fetch weather data
  fetchWeatherData(lat, long);
}

function error() {
  alert("Unable to retrieve your location");
}

function displayMap(lat, long) {
  const mapFrame = document.createElement("iframe");
  mapFrame.setAttribute(
    "src",
    `https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_MAPS_API_KEY&center=${lat},${long}&zoom=14&maptype=satellite`
  );
  mapFrame.setAttribute("width", "100%");
  mapFrame.setAttribute("height", "300px");
  mapFrame.setAttribute("style", "border:0");
  mapFrame.setAttribute("allowfullscreen", "");
  mapFrame.setAttribute("loading", "lazy");
  document.getElementById("map").appendChild(mapFrame);
}

function fetchWeatherData(lat, long) {
  const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayWeatherData(data))
    .catch((err) => console.error(err));
}

function displayWeatherData(data) {
  const weatherDataDiv = document.getElementById("weather-data");
  weatherDataDiv.innerHTML = `
        <div class="weather-item">Location: ${data.timezone}</div>
        <div class="weather-item">Temperature: ${data.current.temp}°C</div>
        <div class="weather-item">Humidity: ${data.current.humidity}%</div>
        <div class="weather-item">Wind Speed: ${data.current.wind_speed} m/s</div>
        <div class="weather-item">Pressure: ${data.current.pressure} hPa</div>
        <div class="weather-item">UV Index: ${data.current.uvi}</div>
        <div class="weather-item">Feels Like: ${data.current.feels_like}°C</div>
        <div class="weather-item">Wind Direction: ${data.current.wind_deg}°</div>
    `;
}
