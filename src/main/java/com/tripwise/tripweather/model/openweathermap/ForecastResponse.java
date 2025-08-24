package com.tripwise.tripweather.model.openweathermap;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.List;

/**
 * Data model for the full JSON response from the OpenWeatherMap forecast API.
 * This class is designed to mirror the external API's structure.
 */
@Data
public class ForecastResponse {
    @JsonProperty("list")
    private List<ForecastItem> forecastList;

    // Correctly map the 'city' object from the API response
    private City city;
}