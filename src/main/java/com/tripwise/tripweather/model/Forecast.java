package com.tripwise.tripweather.model;

import lombok.Data;
import java.util.List;

/**
 * The public-facing data model for the TripWeather service's forecast API response.
 * This class serves as the contract for other microservices, providing a simplified view.
 */
@Data
public class Forecast {
    private String cityName;
    private List<DailyForecast> dailyForecasts;
}