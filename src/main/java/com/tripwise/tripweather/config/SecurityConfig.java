package com.tripwise.tripweather.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * Configures the security filter chain for the weather microservice.
     * This setup defines which endpoints are public and which require a valid JWT.
     * The service is configured as a stateless OAuth2 resource server.
     *
     * @param http The HttpSecurity object to configure security.
     * @return The configured SecurityFilterChain.
     * @throws Exception if an error occurs during configuration.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Protect all weather-related endpoints, requiring a valid JWT for access.
                        .requestMatchers("/weather/**").authenticated()
                        // The following endpoint is a separate, private example that also requires a JWT.
                        .requestMatchers("/api/private/**").authenticated()
                        // Allow all other requests (e.g., static files like index.html) without authentication.
                        .anyRequest().permitAll()
                )
                // Configure the service as an OAuth2 resource server to validate JWTs.
                // It will use the jwk-set-uri configured in application.yml to fetch the public keys.
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> {}));

        return http.build();
    }
}