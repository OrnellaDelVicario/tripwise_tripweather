package com.tripwise.tripweather.model;

import lombok.Data;

@Data
public class WeatherResponse {
    private String cityName;
    private double temperature;
    private double feelsLike;
    private String description;
    private String icon;
    private int humidity;
    private double windSpeed;
}