package com.tripwise.tripweather.model.openweathermap;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * Data model for the 'main' object within the OpenWeatherMap API response.
 * Contains core weather metrics like temperature and humidity.
 */

@Data
public class Main {
    /**
     * Temperature in Celsius.
     * Mapped from the "temp" field in the JSON response.
     */
    @JsonProperty("temp")
    private double temperature;
    /**
     * "Feels like" temperature in Celsius.
     * Mapped from the "feels_like" field in the JSON response.
     */
    @JsonProperty("feels_like")
    private double feelsLike;
    /**
     * Humidity percentage.
     * Mapped from the "humidity" field in the JSON response.
     */
    private int humidity;
}