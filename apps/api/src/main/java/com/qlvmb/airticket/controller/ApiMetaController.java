package com.qlvmb.airticket.controller;

import com.qlvmb.airticket.domain.dto.ApiMetaResponse;
import java.time.OffsetDateTime;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/meta")
public class ApiMetaController {

  private final Environment environment;
  private final String appName;
  private final String appTitle;

  public ApiMetaController(
      Environment environment,
      @Value("${spring.application.name}") String appName,
      @Value("${app.title}") String appTitle
  ) {
    this.environment = environment;
    this.appName = appName;
    this.appTitle = appTitle;
  }

  @GetMapping("/health")
  public ApiMetaResponse getHealth() {
    List<String> activeProfiles = Arrays.stream(environment.getActiveProfiles()).toList();

    return new ApiMetaResponse(
        appName,
        appTitle,
        activeProfiles.isEmpty() ? List.of("default") : activeProfiles,
        Runtime.version().toString(),
        "ok",
        OffsetDateTime.now()
    );
  }
}
