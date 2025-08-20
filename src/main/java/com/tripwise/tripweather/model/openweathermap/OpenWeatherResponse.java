package com.tripwise.tripweather.model.openweathermap;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class OpenWeatherResponse {
    private Main main;
    private List<Weather> weather;
    private Wind wind;
    @JsonProperty("name")
    private String cityName;
}