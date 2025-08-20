package com.tripwise.tripweather.model;

import lombok.Data;

/**
 * The public-facing data model for the TripWeather service API response.
 * This class serves as the contract for other microservices (like Itinerary and Journal).
 * It decouples our service from the external API's data structure.
 */

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