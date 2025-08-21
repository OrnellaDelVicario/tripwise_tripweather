# TripWeather Microservice

## 📄 Overview

The `TripWeather` service is a microservice designed to provide essential weather data for the TripWise application. Its primary function is to serve as an **API wrapper** for the OpenWeatherMap API, providing a reliable and unified source of weather information for both front-end applications and other microservices.

This service is built with a dual-purpose architecture:
* **Public Access:** Provides general weather data (current and forecast) that does not require user authentication. This is intended for public-facing features on the TripWise application, such as showing the weather on the homepage.
* **Secure Access:** Provides weather data for authenticated user actions, such as saving weather information to a user's journal entry.

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
---


## 🌐 API Endpoints

The `TripWeather` service exposes the following RESTful endpoints. All endpoints use the base URL `http://localhost:9095/weather`.

### 1. Public Endpoints (No Authentication Required)

These endpoints are designed for public-facing features, such as showing current weather or a forecast on a landing page. They are intended for consumption by the front-end.

* **Get Current Weather by City Name**
    * **Endpoint**: `/current/city/{cityName}`
    * **Method**: `GET`
    * **Description**: Provides a real-time weather snapshot for a given city.

* **Get Forecast by City Name**
    * **Endpoint**: `/forecast/city/{cityName}`
    * **Method**: `GET`
    * **Description**: Provides a simplified 5-day weather forecast.

* **Get Current Weather by Coordinates**
    * **Endpoint**: `/coords/current?lat={lat}&lon={lon}`
    * **Method**: `GET`
    * **Description**: Retrieves the current weather based on geographical coordinates. This is useful for fetching the weather for a user's current location.

* **Get Forecast by Coordinates**
    * **Endpoint**: `/coords/forecast?lat={lat}&lon={lon}`
    * **Method**: `GET`
    * **Description**: Retrieves a 5-day weather forecast based on geographical coordinates.

---

### 2. Secure Endpoint (Authentication Required)

This endpoint is for internal, service-to-service communication that requires a valid JWT for authentication. It's intended for the Journal service to save weather data linked to a specific user's entry.

* **Endpoint**: `/journal`
* **Method**: `POST`
* **Description**: Accepts a JSON payload from the Journal service containing weather data and a user's JWT. (Note: This endpoint is conceptual and will be implemented in a future task).

---

## 💡 Design & Architecture

### **Dual-Purpose API**
The most important architectural decision for this service is its dual-purpose nature. By providing both public (unauthenticated) and secure (authenticated) endpoints, the service can efficiently support different use cases without compromising security. Public endpoints allow for fast, simple access for general features, while secure endpoints ensure that sensitive, user-specific data is handled with proper authentication.

### **Resilience**
The service is designed to be resilient to external API failures. The `WeatherService` class includes `try-catch` blocks to handle network errors or invalid responses from the OpenWeatherMap API. In case of an error, the service returns a default, empty object instead of crashing, ensuring stability for its consumers.

### **Decoupling**
The service uses two distinct sets of data models:
1.  **Internal Models**: These classes (e.g., `OpenWeatherResponse`, `ForecastResponse`) mirror the exact structure of the external API's JSON.
2.  **Public Models**: These classes (e.g., `WeatherResponse`, `Forecast`) represent the clean, simplified data contract that is exposed to other services. This design choice allows the external API to be swapped in the future without affecting the consuming services.