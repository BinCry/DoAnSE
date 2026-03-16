package com.qlvmb.airticket.controller;

import com.qlvmb.airticket.domain.dto.AirportOptionResponse;
import com.qlvmb.airticket.service.AirportSearchService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/airports")
public class AirportController {

  private final AirportSearchService airportSearchService;

  public AirportController(AirportSearchService airportSearchService) {
    this.airportSearchService = airportSearchService;
  }

  @GetMapping
  public List<AirportOptionResponse> searchAirports(@RequestParam(defaultValue = "") String query) {
    return airportSearchService.search(query);
  }
}
