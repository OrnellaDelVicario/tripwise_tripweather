package com.tripwise.tripweather.service;

import com.tripwise.tripweather.model.WeatherResponse;
import com.tripwise.tripweather.model.openweathermap.OpenWeatherResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    @Value("${weather.api.url}")
    private String apiUrl;

    @Value("${weather.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Fetches current weather data for a given city from the external API.
     * This method also handles data transformation and provides a fallback mechanism.
     *
     * @param cityName The name of the city to get weather for.
     * @return A WeatherResponse object with current weather details.
     */
    public WeatherResponse getCurrentWeather(String cityName) {
        String fullUrl = String.format("%s?q=%s&appid=%s&units=metric", apiUrl, cityName, apiKey);

        try {
            // Making the API call to OpenWeatherMap and mapping the JSON response
            OpenWeatherResponse apiResponse = restTemplate.getForObject(fullUrl, OpenWeatherResponse.class);

            // Transforming the external API model to our public-facing model
            WeatherResponse weatherResponse = new WeatherResponse();
            weatherResponse.setCityName(apiResponse.getCityName());
            weatherResponse.setTemperature(apiResponse.getMain().getTemperature());
            weatherResponse.setFeelsLike(apiResponse.getMain().getFeelsLike());
            weatherResponse.setDescription(apiResponse.getWeather().get(0).getDescription());
            weatherResponse.setIcon(apiResponse.getWeather().get(0).getIcon());
            weatherResponse.setHumidity(apiResponse.getMain().getHumidity());
            weatherResponse.setWindSpeed(apiResponse.getWind().getSpeed());

            return weatherResponse;
        } catch (Exception e) {
            // Fallback logic in case the external API call fails
            // It's a key requirement for resilience
            System.err.println("Error calling external weather API for " + cityName + ": " + e.getMessage());
            return new WeatherResponse(); // Returns an empty/default object
        }
    }
}