package com.tripwise.tripweather.model.openweathermap;

import lombok.Data;

/**
 * Data model for the "city" object in the OpenWeatherMap API response.
 */
@Data
public class City {
    private int id;
    private String name;
    private double lat;
    private double lon;
}