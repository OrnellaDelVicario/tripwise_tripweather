package com.tripwise.tripweather.model.openweathermap;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

/**
 * Data model for the full JSON response from the OpenWeatherMap API.
 * This class is designed to mirror the external API's structure.
 * It is not exposed directly to other services.
 */

@Data
public class OpenWeatherResponse {
    private Main main;
    private List<Weather> weather;
    private Wind wind;

    /**
     * The name of the city, as returned by the API.
     * Mapped from the "name" field in the JSON response.
     */
    @JsonProperty("name")
    private String cityName;
}