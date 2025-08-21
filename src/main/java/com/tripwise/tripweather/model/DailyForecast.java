package com.tripwise.tripweather.model;

import lombok.Data;

/**
 * The public-facing data model for a single day's forecast.
 */
@Data
public class DailyForecast {
    private String date;
    private double temperature;
    private String description;
    private String icon;
}