package com.tripwise.tripweather.controller;

import com.tripwise.tripweather.model.WeatherResponse;
import com.tripwise.tripweather.model.Forecast;
import com.tripwise.tripweather.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for handling weather-related requests.
 * It exposes the public API for the TripWeather service.
 */
@RestController
@RequestMapping("/weather")
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    /**
     * Endpoint to get current weather for a specific city.
     * The URL path is /weather/current/city/{cityName}.
     *
     * @param cityName The name of the city provided in the URL path.
     * @return A ResponseEntity containing the current weather data.
     */
    @GetMapping("/current/city/{cityName}")
    public ResponseEntity<WeatherResponse> getCurrentWeather(@PathVariable String cityName) {
        return weatherService.getCurrentWeather(cityName);
    }

    /**
     * Endpoint to get a 5-day weather forecast for a specific city.
     * The URL path is /weather/forecast/city/{cityName}.
     *
     * @param cityName The name of the city provided in the URL path.
     * @return A ResponseEntity containing the weather forecast data.
     */
    @GetMapping("/forecast/city/{cityName}")
    public ResponseEntity<Forecast> getForecast(@PathVariable String cityName) {
        return weatherService.getForecast(cityName);
    }

    /**
     * Endpoint to get current weather by geographical coordinates.
     * This is for the user's current location.
     * The URL path is /weather/coords/current?lat={lat}&lon={lon}.
     *
     * @param lat The latitude of the location.
     * @param lon The longitude of the location.
     * @return A ResponseEntity containing the weather data.
     */
    @GetMapping("/coords/current")
    public ResponseEntity<WeatherResponse> getWeatherByCoords(@RequestParam double lat, @RequestParam double lon) {
        return weatherService.getWeatherByCoords(lat, lon);
    }

    /**
     * Endpoint to get a 5-day weather forecast by geographical coordinates.
     * This is for the user's current location.
     * The URL path is /weather/coords/forecast?lat={lat}&lon={lon}.
     *
     * @param lat The latitude of the location.
     * @param lon The longitude of the location.
     * @return A ResponseEntity containing the weather data.
     */
    @GetMapping("/coords/forecast")
    public ResponseEntity<Forecast> getForecastByCoords(@RequestParam double lat, @RequestParam double lon) {
        return weatherService.getForecastByCoords(lat, lon);
    }
    @GetMapping("/api/private/data")
    public ResponseEntity<String> getPrivateData() {
        return ResponseEntity.ok("This is private data only for authenticated microservices.");
    }
}