package com.tripwise.tripweather.model.openweathermap;

import lombok.Data;

/**
 * Data model for the 'weather' object within the OpenWeatherMap API response.
 * Contains a weather condition code, icon, and description.
 */

@Data
public class Weather {
    private String description;
    private String icon;
}