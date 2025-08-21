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
        WeatherResponse weather = weatherService.getCurrentWeather(cityName);
        return ResponseEntity.ok(weather);
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
        Forecast forecast = weatherService.getForecast(cityName);
        return ResponseEntity.ok(forecast);
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
        WeatherResponse weather = weatherService.getWeatherByCoords(lat, lon);
        return ResponseEntity.ok(weather);
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
        Forecast forecast = weatherService.getForecastByCoords(lat, lon);
        return ResponseEntity.ok(forecast);
    }
}