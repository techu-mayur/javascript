document.addEventListener("DOMContentLoaded", async function () {
  const apiKey = "8d374c778a5290cb74722c03dc1e9b7d";
  const defaultCity = "Mumbai";
  const defaultCountry = "IN";
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${defaultCity},${defaultCountry}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const currentWeather = data.list[0];
    updateWeatherUI(currentWeather, data.city.name, data.city.country);
    updateWeatherDayContainer(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
});
function updateWeatherUI(currentWeather, cityName, country) {
  document.querySelector(".day h3").textContent = new Intl.DateTimeFormat(
    "en-US",
    { weekday: "long" }
  ).format(new Date());
  document.querySelector(".date h4").textContent =
    new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  document.querySelector(".location h5").textContent = `${country} ${cityName}`;
  document.querySelector(
    ".weather-degree h2"
  ).textContent = `${currentWeather.main.temp}°C`;
  document.querySelector(".weather-degree p").textContent =
    currentWeather.weather[0].description;
  document.querySelector(".list-unstyled li:nth-child(1) span").textContent =
    "0%"; // Precipitation data not available in the free API
  document.querySelector(
    ".list-unstyled li:nth-child(2) span"
  ).textContent = `${currentWeather.main.humidity}%`;
  document.querySelector(
    ".list-unstyled li:nth-child(3) span"
  ).textContent = `${currentWeather.wind.speed} km/h`;
}
function updateWeatherDayContainer(data) {
  const weatherDayContainer = document.querySelector(".weather-day-container");
  weatherDayContainer.innerHTML = "";
  for (let i = 0; i < 7; i++) {
    const dayWeather = data.list[i * 8]; // Get weather for every 24 hours
    // Check if dayWeather and dayWeather.dt are defined before accessing properties
    if (dayWeather && dayWeather.dt) {
      const dayColumn = document.createElement("div");
      dayColumn.classList.add("weather-day-column");
      if (i === 0) {
        dayColumn.classList.add("active");
      }
      dayColumn.innerHTML = `
        <div class="weather-day-icon">
          <i class="fa-solid fa-smog"></i>
        </div>
        <div class="weather-day-text">
          <h6>${new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
            new Date(dayWeather.dt * 1000)
          )}</h6>
        </div>
        <div class="weather-day-weather">
          <p>${dayWeather.main.temp}°C</p>
        </div>
      `;
      weatherDayContainer.appendChild(dayColumn);
    }
  }
}
function openPopup() {
  document.getElementById("locationPopup").style.display = "block";
}
async function searchLocation() {
  const locationInput = document.getElementById("locationInput").value;
  // Check if the location input is empty before updating the weather
  if (!locationInput) {
    alert("Please enter a location before searching.");
    return;
  }
  // Update weather by location and check if successful
  const updateSuccessful = await updateWeatherByLocation(locationInput);
  if (updateSuccessful) {
    // If update is successful, close the popup
    closePopup();
  } else {
    // Handle unsuccessful update (e.g., display an error message)
    alert("Error updating weather. Please try again.");
  }
}
async function updateWeatherByLocation(location) {
  const apiKey = "8d374c778a5290cb74722c03dc1e9b7d";
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (response.ok) {
      // If the response is okay, update the weather UI and return true
      const currentWeather = data.list[0];
      updateWeatherUI(currentWeather, data.city.name, data.city.country);
      updateWeatherDayContainer(data);
      return true;
    } else {
      // If the response is not okay, return false
      return false;
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return false;
  }
}
function closePopup() {
  // Manually hide the modal using jQuery
  $("#locationModal").modal("hide");
  // Remove modal backdrop forcefully
  document.body.classList.remove("modal-open");
  const modalBackdrops = document.getElementsByClassName("modal-backdrop");
  for (const backdrop of modalBackdrops) {
    backdrop.parentNode.removeChild(backdrop);
  }
}
