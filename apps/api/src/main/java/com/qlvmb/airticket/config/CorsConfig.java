package com.qlvmb.airticket.config;

import java.util.Arrays;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

  private final String[] allowedOriginPatterns;

  public CorsConfig(
      @Value("${app.cors.allowed-origin-patterns:http://localhost:3000,http://127.0.0.1:3000}") String rawAllowedOriginPatterns
  ) {
    this.allowedOriginPatterns = Arrays.stream(rawAllowedOriginPatterns.split(","))
        .map(String::trim)
        .filter(value -> !value.isBlank())
        .toArray(String[]::new);
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**")
        .allowedOriginPatterns(allowedOriginPatterns)
        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
        .allowedHeaders("*")
        .allowCredentials(true)
        .maxAge(3600);
  }
}
