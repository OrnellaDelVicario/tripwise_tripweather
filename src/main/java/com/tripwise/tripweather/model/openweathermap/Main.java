package com.tripwise.tripweather.model.openweathermap;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Main {
    @JsonProperty("temp")
    private double temperature;
    @JsonProperty("feels_like")
    private double feelsLike;
    private int humidity;
}