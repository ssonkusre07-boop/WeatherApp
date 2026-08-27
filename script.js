const form = document.getElementById("weatherForm");

const cityInput = document.getElementById("cityInput");

const weatherCard = document.getElementById("weatherCard");

const errorMessage = document.getElementById("errorMessage");

const cityName = document.getElementById("cityName");

const country = document.getElementById("country");

const weatherIcon = document.getElementById("weatherIcon");

const temperature = document.getElementById("temperature");

const description = document.getElementById("description");

const humidity = document.getElementById("humidity");

const wind = document.getElementById("wind");

const feelsLike = document.getElementById("feelsLike");

// ===============================
// OPENWEATHER API KEY
// ===============================

const apiKey = "1d6335a25940c5cb3345d47110efc18f";

// ===============================
// FORM SUBMIT
// ===============================

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const city = cityInput.value.trim();

  // Empty input check
  if (city === "") {
    errorMessage.textContent = "❌ Please enter a city name.";
    weatherCard.style.display = "none";
    return;
  }

  try {
    // Clear previous error
    errorMessage.textContent = "";

    // Hide previous weather card
    weatherCard.style.display = "none";

    // ===============================
    // API URL
    // ===============================

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    // ===============================
    // FETCH WEATHER DATA
    // ===============================

    const response = await fetch(url);

    // ===============================
    // CHECK RESPONSE
    // ===============================

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message);
    }

    // ===============================
    // CONVERT TO JSON
    // ===============================

    const data = await response.json();

    // ===============================
    // CITY & COUNTRY
    // ===============================

    cityName.textContent = data.name;

    country.textContent = data.sys.country;

    // ===============================
    // TEMPERATURE
    // ===============================

    temperature.textContent = `${Math.round(data.main.temp)}°C`;

    // ===============================
    // WEATHER DESCRIPTION
    // ===============================

    description.textContent = data.weather[0].description;

    // ===============================
    // HUMIDITY
    // ===============================

    humidity.textContent = `${data.main.humidity}%`;

    // ===============================
    // WIND SPEED
    // ===============================

    const windSpeed = (data.wind.speed * 3.6).toFixed(1);

    wind.textContent = `${windSpeed} km/h`;

    // ===============================
    // FEELS LIKE
    // ===============================

    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;

    // ===============================
    // WEATHER ICON
    // ===============================

    const iconCode = data.weather[0].icon;

    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // ===============================
    // SHOW WEATHER CARD
    // ===============================

    weatherCard.style.display = "block";
  } catch (error) {
    // Hide weather card
    weatherCard.style.display = "none";

    // Show actual error
    if (error.message === "city not found") {
      errorMessage.textContent =
        "❌ City not found. Please check the city name.";
    } else if (error.message === "Invalid API key") {
      errorMessage.textContent = "❌ API key is invalid or not activated yet.";
    } else {
      errorMessage.textContent = "❌ " + error.message;
    }

    // Show error in browser console
    console.error("Weather API Error:", error);
  }
});
