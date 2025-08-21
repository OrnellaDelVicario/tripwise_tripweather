# TripWeather Microservice

## 📄 Overview

The `TripWeather` service is a microservice designed to provide essential weather data for the TripWise application. Its primary function is to act as an **API wrapper** for an external weather service, providing a unified and reliable source of weather information for other microservices.

This service handles two main functionalities:
1.  **Current Weather**: Provides a real-time weather snapshot for a given city.
2.  **Weather Forecast**: Delivers a 5-day weather forecast, consolidated into daily entries, for travel planning.

---

## 🚀 Getting Started

### 🛠️ Technology Stack

* **Language**: Java
* **Framework**: Spring Boot
* **Build Tool**: Maven
* **Dependencies**: Spring Web, Lombok
* **External API**: OpenWeatherMap

### 🔑 API Key Configuration

This service relies on a private API key for authentication with the external OpenWeatherMap API. **The key must not be hardcoded in the source file**.

1.  **Obtain a Key**: Sign up for a free account at [https://openweathermap.org/](https://openweathermap.org/) and generate an API key from your profile dashboard.
2.  **Set Environment Variable**: Configure the API key as an environment variable named `WEATHER_API_KEY`.

    * **In IntelliJ**: Navigate to `Run -> Edit Configurations...`, select your Spring Boot application, and add `WEATHER_API_KEY` with your key in the `Environment variables` field.

### ▶️ How to Run

After configuring the `WEATHER_API_KEY` environment variable, run the application from your terminal or IDE.
The service will start on port 9095, as defined in application.yml.


```bash
./mvnw spring-boot:run
```



## 🌐 API Endpoints

The `TripWeather` service exposes the following RESTful endpoints for other microservices to consume. All endpoints use the base URL `http://localhost:9095/weather`.

### 1. Get Current Weather

* **Endpoint**: `/current/city/{cityName}`
* **Method**: `GET`
* **Description**: Provides current weather details for a specific city. This endpoint is used by the **Journal Service** to record weather at the time of an activity.

**Example Request:**
```http
GET http://localhost:9095/weather/current/city/London
```

**Example Response (JSON):**
```
{
    "cityName": "London",
    "temperature": 15.6,
    "feelsLike": 14.8,
    "description": "overcast clouds",
    "icon": "04d",
    "humidity": 68,
    "windSpeed": 4.12
}
```



### 2. Get Weather Forecast

* **Endpoint**: `/forecast/city/{cityName}`
* **Method**: `GET`
* **Description**: Provides a simplified 5-day weather forecast (one entry per day, consolidated from 3-hour intervals). This is used by the **Itinerary Service** for trip planning.

**Example Request:**

```http
GET http://localhost:9095/weather/forecast/city/Paris
```

**Example Response (JSON):**

```
{
    "cityName": "Paris",
    "dailyForecasts": [
        {
            "date": "2025-08-21",
            "temperature": 21.4,
            "description": "light rain",
            "icon": "10d"
        },
        {
            "date": "2025-08-22",
            "temperature": 23.1,
            "description": "sunny",
            "icon": "01d"
        }
        // ... more days
    ]
}
```
---

## 💡 Design & Architecture

### **Resilience**
The service is designed to be resilient to external API failures. The `WeatherService` class includes `try-catch` blocks to handle network errors or invalid responses from the OpenWeatherMap API. In case of an error, the service returns a default, empty object instead of crashing, ensuring stability for its consumers.

### **Decoupling**
The service uses two distinct sets of data models:
1.  **Internal Models**: These classes (e.g., `OpenWeatherResponse`, `ForecastResponse`) mirror the exact structure of the external API's JSON.
2.  **Public Models**: These classes (e.g., `WeatherResponse`, `Forecast`) represent the clean, simplified data contract that is exposed to other services. This design choice allows the external API to be swapped in the future without affecting the consuming services.