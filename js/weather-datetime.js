// Constants
const WEATHER_API_KEY = '70de431cfaa1ad25135c69a0b78139b1';
const TORONTO_LAT = 43.6532;
const TORONTO_LON = -79.3832;

// DOM Elements
const datetimeElement = document.getElementById('datetime');
const temperatureElement = document.getElementById('temperature');
const weatherIcon = document.getElementById('weatherIcon');

// Weather icon mapping
const weatherIcons = {
    Clear: 'fa-sun',
    Clouds: 'fa-cloud',
    Rain: 'fa-cloud-rain',
    Snow: 'fa-snowflake',
    Thunderstorm: 'fa-bolt',
    Drizzle: 'fa-cloud-rain',
    Mist: 'fa-smog',
    Haze: 'fa-smog',
    Fog: 'fa-smog',
    Smoke: 'fa-smog',
    loading: 'fa-spinner fa-spin'
};

// Function to update date and time
function updateDateTime() {
    const now = new Date();
    const formatted = now.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    });

    // Smoothly update the time
    if (datetimeElement.textContent !== formatted) {
        datetimeElement.style.opacity = '0';
        setTimeout(() => {
            datetimeElement.textContent = formatted;
            datetimeElement.style.opacity = '1';
        }, 300);
    }
}

// Function to fetch and update weather
async function fetchWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${TORONTO_LAT}&lon=${TORONTO_LON}&units=metric&appid=${WEATHER_API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch weather data');

        const data = await response.json();
        const weather = data.weather[0].main;
        const temp = data.main.temp.toFixed(1);

        temperatureElement.textContent = `${temp}°C`;
        weatherIcon.className = `fas ${weatherIcons[weather] || 'fa-question'}`;
    } catch (error) {
        console.error(error);
        temperatureElement.textContent = 'Unable to load weather';
        weatherIcon.className = `fas ${weatherIcons.loading}`;
    }
}

// Initialize the page
function initialize() {
    // Start updating date and time
    setInterval(updateDateTime, 1000);

    // Fetch and display weather
    fetchWeather();

    // Refresh weather every 10 minutes
    setInterval(fetchWeather, 600000);
}

// Run the initialize function after DOM is loaded
document.addEventListener('DOMContentLoaded', initialize);

module.exports = {
    updateDateTime,
    fetchWeather,
    initialize
};