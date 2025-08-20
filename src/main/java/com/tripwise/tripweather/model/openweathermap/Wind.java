package com.tripwise.tripweather.model.openweathermap;

import lombok.Data;

/**
 * Data model for the 'wind' object within the OpenWeatherMap API response.
 * Contains wind speed and direction data.
 */

@Data
public class Wind {
    private double speed;
}