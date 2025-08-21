package com.tripwise.tripweather.model.openweathermap;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.List;

/**
 * Data model for a single forecast item (e.g., a 3-hour period)
 * from the OpenWeatherMap forecast API.
 */
@Data
public class ForecastItem {
    @JsonProperty("dt_txt")
    private String dateTime;
    private Main main;
    private List<Weather> weather;
    private Wind wind;
}