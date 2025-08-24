// Global variable to hold the map instance
let map = null;

// Map OpenWeatherMap icon codes to SVG icons
const weatherIconMap = {
    // Day icons
    "01d": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f1c40f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    "02d": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f1c40f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cloud-sun"><path d="M16 16.5a4.5 4.5 0 0 0-4.5-4.5H12a4 4 0 0 0-4 4 4 4 0 0 0 4 4c0 1-.5 2-1 3"></path><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    "03d": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#95a5a6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cloud"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>`,
    "04d": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7f8c8d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cloud-drizzle"><line x1="8" y1="19" x2="8" y2="21"></line><line x1="8" y1="13" x2="8" y2="15"></line><line x1="16" y1="13" x2="16" y2="15"></line><line x1="16" y1="19" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="19"></line><line x1="12" y1="11" x2="12" y2="13"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 16.58"></path></svg>`,
    "09d": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3498db" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cloud-drizzle"><line x1="8" y1="19" x2="8" y2="21"></line><line x1="8" y1="13" x2="8" y2="15"></line><line x1="16" y1="13" x2="16" y2="15"></line><line x1="16" y1="19" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="19"></line><line x1="12" y1="11" x2="12" y2="13"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 16.58"></path></svg>`,
    "10d": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3498db" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cloud-rain"><line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="15" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 16.58"></path></svg>`,
    "11d": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cloud-lightning"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9.25"></path><polyline points="13 11 9 17 15 17 11 23"></polyline></svg>`,
    "13d": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ecf0f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cloud-snow"><path d="M20 12.01A5 5 0 0 0 18 3h-1.26A8 8 0 1 0 4 12.01"></path><path d="M20 18.01A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 4 18.01"></path></svg>`,
    "50d": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#bdc3c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cloud-fog"><path d="M16 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 16.58"></path><line x1="8" y1="19" x2="16" y2="19"></line><line x1="10" y1="15" x2="18" y2="15"></line></svg>`,
    // Night icons (simplified for brevity)
    "01n": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f1c40f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
    "02n": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f1c40f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cloud-moon"><path d="M16 16.5A4.5 4.5 0 0 0 12 12c-2.42-.5-5.26-.5-8 0a4.5 4.5 0 0 0-4.5-4.5 4 4 0 0 0-4 4c0 1-.5 2-1 3"></path><path d="M12 12a7 7 0 0 0 9 10.79A9 9 0 1 1 12 2.15z"></path></svg>`,
    "03n": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#95a5a6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cloud"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>`,
    "04n": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7f8c8d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cloud-drizzle"><line x1="8" y1="19" x2="8" y2="21"></line><line x1="8" y1="13" x2="8" y2="15"></line><line x1="16" y1="13" x2="16" y2="15"></line><line x1="16" y1="19" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="19"></line><line x1="12" y1="11" x2="12" y2="13"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 16.58"></path></svg>`,
    "09n": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3498db" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cloud-drizzle"><line x1="8" y1="19" x2="8" y2="21"></line><line x1="8" y1="13" x2="8" y2="15"></line><line x1="16" y1="13" x2="16" y2="15"></line><line x1="16" y1="19" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="19"></line><line x1="12" y1="11" x2="12" y2="13"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 16.58"></path></svg>`,
    "10n": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3498db" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cloud-rain"><line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="15" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 16.58"></path></svg>`,
    "11n": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cloud-lightning"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9.25"></path><polyline points="13 11 9 17 15 17 11 23"></polyline></svg>`,
    "13n": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ecf0f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cloud-snow"><path d="M20 12.01A5 5 0 0 0 18 3h-1.26A8 8 0 1 0 4 12.01"></path><path d="M20 18.01A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 4 18.01"></path></svg>`,
    "50n": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#bdc3c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cloud-fog"><path d="M16 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 16.58"></path><line x1="8" y1="19" x2="16" y2="19"></line><line x1="10" y1="15" x2="18" y2="15"></line></svg>`,
};

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

// Initialize the map with default coordinates on page load
document.addEventListener('DOMContentLoaded', () => {
    initMap(52.5200, 13.4050); // Coordinates for Berlin, a good default
});

function showResultSections() {
    document.getElementById('result-display-container').classList.remove('hidden');
    document.getElementById('current-weather-section').classList.remove('hidden');
    document.getElementById('forecast-weather-section').classList.add('hidden');
    document.querySelector('.toggle-btn.active')?.classList.remove('active');
    document.querySelector('.toggle-btn[data-target="current-weather-section"]').classList.add('active');
}

function hideResultSections() {
    document.getElementById('result-display-container').classList.add('hidden');
}

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
            currentSection.classList.add('hidden');
            forecastSection.classList.remove('hidden');
        }
    });
});

async function handleSearch() {
    const city = document.getElementById('city-input').value;
    if (city) {
        try {
            const weatherResponse = await fetch(`http://127.0.0.1:9095/weather?city=${city}`);
            const weatherData = await weatherResponse.json();
            displayCurrentWeather(weatherData);

            const forecastResponse = await fetch(`http://127.0.0.1:9095/forecast?city=${city}`);
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);

            if (weatherData.lat && weatherData.lon) {
                initMap(weatherData.lat, weatherData.lon);
            }

            showResultSections();
        } catch (error) {
            console.error('Error fetching data:', error);
            hideResultSections();
            alert('Could not find weather for this city. Please try again.');
        }
    }
}

document.getElementById('city-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});

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

async function getWeatherByCoords(lat, lon) {
    try {
        const weatherResponse = await fetch(`http://127.0.0.1:9095/weather?lat=${lat}&lon=${lon}`);
        const weatherData = await weatherResponse.json();
        displayCurrentWeather(weatherData);

        const forecastResponse = await fetch(`http://127.0.0.1:9095/forecast?lat=${lat}&lon=${lon}`);
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);

        initMap(lat, lon);
        showResultSections();
    } catch (error) {
            console.error('Error fetching data:', error);
            hideResultSections();
            alert('Could not get weather for this location. Please try again.');
        }
}

function displayCurrentWeather(data) {
    const container = document.getElementById('current-weather');
    const iconSvg = weatherIconMap[data.icon] || '';
    const formattedCondition = data.condition.charAt(0).toUpperCase() + data.condition.slice(1);
    container.innerHTML = `
        <h3>${data.city}</h3>
        <p class="temp">${Math.round(data.temperature)}°C</p>
        <div class="weather-icon">${iconSvg}</div>
        <p class="condition">${formattedCondition}</p>
    `;
}

function displayForecast(data) {
    const container = document.getElementById('forecast-container');
    container.innerHTML = '';
    data.forecast.forEach(day => {
        const date = new Date(day.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
        const iconSvg = weatherIconMap[day.icon] || '';
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <h4>${date}</h4>
            <div class="weather-icon">${iconSvg}</div>
            <p class="condition">${day.description.charAt(0).toUpperCase() + day.description.slice(1)}</p>
            <p><strong>Max:</strong> ${Math.round(day.high)}°C</p>
            <p><strong>Min:</strong> ${Math.round(day.low)}°C</p>
        `;
        container.appendChild(card);
    });
}