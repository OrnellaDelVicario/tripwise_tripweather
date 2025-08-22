document.getElementById('search-btn').addEventListener('click', async () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        try {
            const weatherResponse = await fetch(`http://127.0.0.1:9095/weather?city=${city}`);
            const weatherData = await weatherResponse.json();
            displayCurrentWeather(weatherData);

            const forecastResponse = await fetch(`http://127.0.0.1:9095/forecast?city=${city}`);
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);

        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Could not find weather for this city. Please try again.');
        }
    }
});

document.getElementById('current-location-btn').addEventListener('click', () => {
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
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Could not get weather for this location. Please try again.');
    }
}

function displayCurrentWeather(data) {
    const container = document.getElementById('current-weather');
    container.innerHTML = `
        <h3>${data.city}</h3>
        <p>Temperature: ${data.temperature}°C</p>
        <p>Condition: ${data.condition}</p>
        <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="Weather icon">
    `;
}

function displayForecast(data) {
    const container = document.getElementById('forecast-container');
    container.innerHTML = ''; // Clear previous forecast
    data.forecast.forEach(day => {
        const date = new Date(day.date).toLocaleDateString();
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <h4>${date}</h4>
            <img src="https://openweathermap.org/img/wn/${day.icon}@2x.png" alt="Weather icon">
            <p>High: ${day.high}°C</p>
            <p>Low: ${day.low}°C</p>
        `;
        container.appendChild(card);
    });
}