package com.tripwise.tripweather;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;


@SpringBootApplication
public class TripweatherApplication {

	public static void main(String[] args) {
		SpringApplication.run(TripweatherApplication.class, args);
		Dotenv.load();

	}

}
