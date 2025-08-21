package com.tripwise.tripweather.service;

import com.tripwise.tripweather.model.WeatherResponse;
import com.tripwise.tripweather.model.Forecast;
import com.tripwise.tripweather.model.DailyForecast;
import com.tripwise.tripweather.model.openweathermap.OpenWeatherResponse;
import com.tripwise.tripweather.model.openweathermap.ForecastResponse;
import com.tripwise.tripweather.model.openweathermap.ForecastItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Service layer for fetching weather data from the OpenWeatherMap API.
 * This service handles both current weather and forecast requests.
 * It also includes data transformation logic and a basic resilience mechanism.
 */
@Service
public class WeatherService {

    @Value("${weather.api.current}")
    private String currentWeatherUrl;

    @Value("${weather.api.forecast}")
    private String forecastUrl;

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
        String fullUrl = String.format("%s?q=%s&appid=%s&units=metric", currentWeatherUrl, cityName, apiKey);

        try {
            OpenWeatherResponse apiResponse = restTemplate.getForObject(fullUrl, OpenWeatherResponse.class);

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
            System.err.println("Error calling current weather API for " + cityName + ": " + e.getMessage());
            return new WeatherResponse();
        }
    }

    /**
     * Fetches weather forecast data for a given city.
     * It processes the 5-day / 3-hour forecast from the external API and
     * consolidates it into a simple daily forecast.
     *
     * @param cityName The name of the city to get the forecast for.
     * @return A Forecast object with a list of daily weather forecasts.
     */
    public Forecast getForecast(String cityName) {
        String fullUrl = String.format("%s?q=%s&appid=%s&units=metric", forecastUrl, cityName, apiKey);

        try {
            ForecastResponse apiResponse = restTemplate.getForObject(fullUrl, ForecastResponse.class);

            Map<LocalDate, List<ForecastItem>> dailyForecastsMap = apiResponse.getForecastList().stream()
                    .collect(Collectors.groupingBy(item -> LocalDate.parse(item.getDateTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))));

            List<DailyForecast> dailyForecasts = new ArrayList<>();
            for (Map.Entry<LocalDate, List<ForecastItem>> entry : dailyForecastsMap.entrySet()) {
                entry.getValue().stream()
                        .filter(item -> item.getDateTime().endsWith("12:00:00"))
                        .findFirst()
                        .ifPresent(middayForecast -> {
                            DailyForecast dailyForecast = new DailyForecast();
                            dailyForecast.setDate(middayForecast.getDateTime().split(" ")[0]);
                            dailyForecast.setTemperature(middayForecast.getMain().getTemperature());
                            dailyForecast.setDescription(middayForecast.getWeather().get(0).getDescription());
                            dailyForecast.setIcon(middayForecast.getWeather().get(0).getIcon());
                            dailyForecasts.add(dailyForecast);
                        });
            }

            Forecast forecast = new Forecast();
            forecast.setCityName(cityName);
            forecast.setDailyForecasts(dailyForecasts);

            return forecast;
        } catch (Exception e) {
            System.err.println("Error calling weather forecast API for " + cityName + ": " + e.getMessage());
            return new Forecast();
        }
    }

    /**
     * Fetches current weather data for a given location using geographical coordinates.
     * This endpoint is intended for the user's current location and is a public-facing endpoint.
     *
     * @param lat The latitude of the location.
     * @param lon The longitude of the location.
     * @return A WeatherResponse object with current weather details.
     */
    public WeatherResponse getWeatherByCoords(double lat, double lon) {
        String fullUrl = String.format("%s?lat=%f&lon=%f&appid=%s&units=metric", currentWeatherUrl, lat, lon, apiKey);

        try {
            OpenWeatherResponse apiResponse = restTemplate.getForObject(fullUrl, OpenWeatherResponse.class);

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
            System.err.println("Error calling current weather API for coords (" + lat + ", " + lon + "): " + e.getMessage());
            return new WeatherResponse();
        }
    }

    /**
     * Fetches weather forecast data for a given location using geographical coordinates.
     * This method mirrors the getForecast(cityName) method but uses lat/lon.
     *
     * @param lat The latitude of the location.
     * @param lon The longitude of the location.
     * @return A Forecast object with a list of daily weather forecasts.
     */
    public Forecast getForecastByCoords(double lat, double lon) {
        String fullUrl = String.format("%s?lat=%f&lon=%f&appid=%s&units=metric", forecastUrl, lat, lon, apiKey);

        try {
            ForecastResponse apiResponse = restTemplate.getForObject(fullUrl, ForecastResponse.class);
            Map<LocalDate, List<ForecastItem>> dailyForecastsMap = apiResponse.getForecastList().stream()
                    .collect(Collectors.groupingBy(item -> LocalDate.parse(item.getDateTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))));

            List<DailyForecast> dailyForecasts = new ArrayList<>();
            for (Map.Entry<LocalDate, List<ForecastItem>> entry : dailyForecastsMap.entrySet()) {
                entry.getValue().stream()
                        .filter(item -> item.getDateTime().endsWith("12:00:00"))
                        .findFirst()
                        .ifPresent(middayForecast -> {
                            DailyForecast dailyForecast = new DailyForecast();
                            dailyForecast.setDate(middayForecast.getDateTime().split(" ")[0]);
                            dailyForecast.setTemperature(middayForecast.getMain().getTemperature());
                            dailyForecast.setDescription(middayForecast.getWeather().get(0).getDescription());
                            dailyForecast.setIcon(middayForecast.getWeather().get(0).getIcon());
                            dailyForecasts.add(dailyForecast);
                        });
            }

            Forecast forecast = new Forecast();
            forecast.setCityName(apiResponse.getCity().getName()); // Get the city name from the response
            forecast.setDailyForecasts(dailyForecasts);

            return forecast;
        } catch (Exception e) {
            System.err.println("Error calling forecast API for coords (" + lat + ", " + lon + "): " + e.getMessage());
            return new Forecast();
        }
    }
}