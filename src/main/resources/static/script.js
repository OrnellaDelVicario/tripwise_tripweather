// Global variable to hold the map instance
let map = null;

// Global variable to hold the user's JWT token
let userToken = null;

// Map OpenWeatherMap icon codes to SVG icons for a clean look.
const weatherIconMap = {
    "01d": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',
    "01n": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',
    "02d": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 17.5a4 4 0 0 0 0-7.5H20a2.5 2.5 0 0 0 0-5c-1.38 0-2.22.8-3.5 2a.5.5 0 0 1-.5.5A7 7 0 1 1 11 20H5a2 2 0 0 1-2-2"></path></svg>',
    "02n": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 17.5a4 4 0 0 0 0-7.5H20a2.5 2.5 0 0 0 0-5c-1.38 0-2.22.8-3.5 2a.5.5 0 0 1-.5.5A7 7 0 1 1 11 20H5a2 2 0 0 1-2-2"></path></svg>',
    "03d": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 17.5a4 4 0 0 0 0-7.5H20a2.5 2.5 0 0 0 0-5c-1.38 0-2.22.8-3.5 2a.5.5 0 0 1-.5.5A7 7 0 1 1 11 20H5a2 2 0 0 1-2-2"></path></svg>',
    "03n": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 17.5a4 4 0 0 0 0-7.5H20a2.5 2.5 0 0 0 0-5c-1.38 0-2.22.8-3.5 2a.5.5 0 0 1-.5.5A7 7 0 1 1 11 20H5a2 2 0 0 1-2-2"></path></svg>',
    "04d": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 17.5a4 4 0 0 0 0-7.5H20a2.5 2.5 0 0 0 0-5c-1.38 0-2.22.8-3.5 2a.5.5 0 0 1-.5.5A7 7 0 1 1 11 20H5a2 2 0 0 1-2-2"></path></svg>',
    "04n": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 17.5a4 4 0 0 0 0-7.5H20a2.5 2.5 0 0 0 0-5c-1.38 0-2.22.8-3.5 2a.5.5 0 0 1-.5.5A7 7 0 1 1 11 20H5a2 2 0 0 1-2-2"></path></svg>',
    "09d": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 17.5a4 4 0 0 0 0-7.5H20a2.5 2.5 0 0 0 0-5c-1.38 0-2.22.8-3.5 2a.5.5 0 0 1-.5.5A7 7 0 1 1 11 20H5a2 2 0 0 1-2-2"></path><line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
    "09n": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 17.5a4 4 0 0 0 0-7.5H20a2.5 2.5 0 0 0 0-5c-1.38 0-2.22.8-3.5 2a.5.5 0 0 1-.5.5A7 7 0 1 1 11 20H5a2 2 0 0 1-2-2"></path><line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
    "10d": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 17.5a4 4 0 0 0 0-7.5H20a2.5 2.5 0 0 0 0-5c-1.38 0-2.22.8-3.5 2a.5.5 0 0 1-.5.5A7 7 0 1 1 11 20H5a2 2 0 0 1-2-2"></path><line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
    "10n": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 17.5a4 4 0 0 0 0-7.5H20a2.5 2.5 0 0 0 0-5c-1.38 0-2.22.8-3.5 2a.5.5 0 0 1-.5.5A7 7 0 1 1 11 20H5a2 2 0 0 1-2-2"></path><line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
    "11d": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 17.5a4 4 0 0 0 0-7.5H20a2.5 2.5 0 0 0 0-5c-1.38 0-2.22.8-3.5 2a.5.5 0 0 1-.5.5A7 7 0 1 1 11 20H5a2 2 0 0 1-2-2"></path><path d="M14 13l-4 8h8l-4-8z"></path></svg>',
    "11n": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 17.5a4 4 0 0 0 0-7.5H20a2.5 2.5 0 0 0 0-5c-1.38 0-2.22.8-3.5 2a.5.5 0 0 1-.5.5A7 7 0 1 1 11 20H5a2 2 0 0 1-2-2"></path><path d="M14 13l-4 8h8l-4-8z"></path></svg>',
    "13d": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 17.5a4 4 0 0 0 0-7.5H20a2.5 2.5 0 0 0 0-5c-1.38 0-2.22.8-3.5 2a.5.5 0 0 1-.5.5A7 7 0 1 1 11 20H5a2 2 0 0 1-2-2"></path><path d="M14 13l-4 8h8l-4-8z"></path></svg>',
    "13n": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 17.5a4 4 0 0 0 0-7.5H20a2.5 2.5 0 0 0 0-5c-1.38 0-2.22.8-3.5 2a.5.5 0 0 1-.5.5A7 7 0 1 1 11 20H5a2 2 0 0 1-2-2"></path><path d="M14 13l-4 8h8l-4-8z"></path></svg>',
    "50d": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 17.5a4 4 0 0 0 0-7.5H20a2.5 2.5 0 0 0 0-5c-1.38 0-2.22.8-3.5 2a.5.5 0 0 1-.5.5A7 7 0 1 1 11 20H5a2 2 0 0 1-2-2"></path><line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
    "50n": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 17.5a4 4 0 0 0 0-7.5H20a2.5 2.5 0 0 0 0-5c-1.38 0-2.22.8-3.5 2a.5.5 0 0 1-.5.5A7 7 0 1 1 11 20H5a2 2 0 0 1-2-2"></path><line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
};

/**
 * Initializes and displays the map using Leaflet.js.
 * @param {number} lat - The latitude to center the map on.
 * @param {number} lon - The longitude to center the map on.
 * @param {number} [zoom=13] - The zoom level of the map.
 */
function initMap(lat, lon, zoom = 13) {
    if (map) {
        map.remove();
    }
    map = L.map('map').setView([lat, lon], zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map)
        .bindPopup(`<b>Your location</b>`).openPopup();
}

/**
 * Asynchronously fetches the JWT from the trippass service.
 * Hides login button and shows search container if a token is successfully retrieved.
 */
async function checkAndFetchToken() {
    try {
        const response = await fetch('http://localhost:9091/token', {
            method: 'GET',
            credentials: 'include'
        });

        if (response.ok) {
            userToken = await response.text();
            console.log("Login successful. Token fetched and saved.");

            const loginBtn = document.getElementById('login-btn');
            const searchContainer = document.querySelector('.search-container');
            if (loginBtn && searchContainer) {
                loginBtn.classList.add('hidden');
                searchContainer.classList.remove('hidden');
            }
        } else {
            console.warn("User is not authenticated. Login button remains visible.");
        }
    } catch (error) {
        console.error("Error fetching token:", error);
    }
}

// Initializes the map and checks for a valid token on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAndFetchToken();
    initMap(52.5200, 13.4050); // Default coordinates for Berlin
});

/**
 * Shows the result sections and hides the forecast section by default.
 */
function showResultSections() {
    document.getElementById('result-display-container').classList.remove('hidden');
    document.getElementById('current-weather-section').classList.remove('hidden');
    document.getElementById('forecast-weather-section').classList.add('hidden');
    document.querySelector('.toggle-btn.active')?.classList.remove('active');
    document.querySelector('.toggle-btn[data-target="current-weather-section"]').classList.add('active');
}

/**
 * Hides all weather result sections.
 */
function hideResultSections() {
    document.getElementById('result-display-container').classList.add('hidden');
}

// Adds event listeners to the weather toggle buttons
document.querySelectorAll('.toggle-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const currentSection = document.getElementById('current-weather-section');
        const forecastSection = document.getElementById('forecast-weather-section');

        if (button.getAttribute('data-target') === 'current-weather-section') {
            currentSection.classList.remove('hidden');
            forecastSection.classList.add('hidden');
        } else {
            forecastSection.classList.remove('hidden');
            currentSection.classList.add('hidden');
        }
    });
});

/**
 * Handles the user login process.
 */
function handleLogin() {
    window.location.href = 'http://localhost:9091/login';
}

/**
 * Handles the weather search by city name.
 */
async function handleSearch() {
    const city = document.getElementById('city-input').value;

    if (!userToken) {
        alert("Authentication in progress, please wait a moment and try again.");
        return;
    }

    if (city) {
        try {
            const headers = {
                'Authorization': `Bearer ${userToken}`
            };

            const weatherResponse = await fetch(`http://localhost:9095/weather/current/city/${city}`, { headers: headers });
            // --- NUEVO MANEJO DE ERRORES ---
            if (!weatherResponse.ok) {
                hideResultSections();
                alert('Could not find weather for this city. Please try again.');
                return; // Exit the function to prevent further execution
            }
            // -----------------------------
            const weatherData = await weatherResponse.json();
            displayCurrentWeather(weatherData);

            const forecastResponse = await fetch(`http://localhost:9095/weather/forecast/city/${city}`, { headers: headers });
            // --- NUEVO MANEJO DE ERRORES ---
            if (!forecastResponse.ok) {
                displayForecast({ dailyForecasts: [] }); // Show no forecast data
            } else {
                const forecastData = await forecastResponse.json();
                displayForecast(forecastData);
            }
            // -----------------------------

            if (weatherData.lat && weatherData.lon) {
                initMap(weatherData.lat, weatherData.lon);
            }

            showResultSections();
        } catch (error) {
            console.error('Error fetching data:', error);
            hideResultSections();
            alert('An unexpected error occurred. Please try again.');
        }
    }
}

// Adds an event listener to the city input field for the 'Enter' key.
document.getElementById('city-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});

// Adds an event listener to the location icon button to use geolocation.
document.getElementById('location-icon-btn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByCoords(lat, lon);
        }, error => {
            alert("Unable to retrieve your location. Please ensure location access is enabled.");
            console.error(error);
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});

/**
 * Fetches weather data based on geographic coordinates.
 */
async function getWeatherByCoords(lat, lon) {
    if (!userToken) {
        alert("Please log in first to get the weather information.");
        return;
    }

    try {
        const headers = {
            'Authorization': `Bearer ${userToken}`
        };

        const weatherResponse = await fetch(`http://localhost:9095/weather/coords/current?lat=${lat}&lon=${lon}`, { headers: headers });
        // --- NUEVO MANEJO DE ERRORES ---
        if (!weatherResponse.ok) {
            hideResultSections();
            alert('Could not get weather for this location. Please try again.');
            return; // Exit the function to prevent further execution
        }
        // -----------------------------
        const weatherData = await weatherResponse.json();
        displayCurrentWeather(weatherData);

        const forecastResponse = await fetch(`http://localhost:9095/weather/coords/forecast?lat=${lat}&lon=${lon}`, { headers: headers });
        // --- NUEVO MANEJO DE ERRORES ---
        if (!forecastResponse.ok) {
            displayForecast({ dailyForecasts: [] }); // Show no forecast data
        } else {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        }
        // -----------------------------

        initMap(lat, lon);
        showResultSections();
    } catch (error) {
        console.error('Error fetching data:', error);
        hideResultSections();
        alert('An unexpected error occurred. Please try again.');
    }
}

/**
 * Updates the UI with the current weather data.
 * @param {object} data - The current weather data object.
 */
function displayCurrentWeather(data) {
    const container = document.getElementById('current-weather');
    const iconSvg = weatherIconMap[data.icon] || '';
    const formattedDescription = data.description.charAt(0).toUpperCase() + data.description.slice(1);
    container.innerHTML = `
        <h3>${data.cityName}</h3>
        <p class="temp">${Math.round(data.temperature)}°C</p>
        <div class="weather-icon">${iconSvg}</div>
        <p class="condition">${formattedDescription}</p>
    `;
}

/**
 * Updates the UI with the 5-day forecast data.
 * @param {object} data - The forecast data object.
 */
function displayForecast(data) {
    const container = document.getElementById('forecast-container');
    container.innerHTML = '';

    // Check if the forecast data is not an empty array or null
    if (data.dailyForecasts && data.dailyForecasts.length > 0) {
        data.dailyForecasts.forEach(day => {
            const date = new Date(day.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
            const iconSvg = weatherIconMap[day.icon] || '';
            const card = document.createElement('div');
            card.className = 'forecast-card';
            card.innerHTML = `
                <h4>${date}</h4>
                <div class="weather-icon">${iconSvg}</div>
                <p class="condition">${day.description.charAt(0).toUpperCase() + day.description.slice(1)}</p>
                <p><strong>Temp:</strong> ${Math.round(day.temperature)}°C</p>
            `;
            container.appendChild(card);
        });
    } else {
        container.innerHTML = '<p>No forecast data available.</p>';
    }
}