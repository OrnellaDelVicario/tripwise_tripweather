package com.tripwise.tripweather.controller;

import com.tripwise.tripweather.model.WeatherResponse;
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
     *
     * @param cityName The name of the city provided in the URL path.
     * @return A ResponseEntity containing the weather data for the city.
     */
    @GetMapping("/city/{cityName}")
    public ResponseEntity<WeatherResponse> getWeatherByCity(@PathVariable String cityName) {
        WeatherResponse weather = weatherService.getCurrentWeather(cityName);
        return ResponseEntity.ok(weather);
    }
}