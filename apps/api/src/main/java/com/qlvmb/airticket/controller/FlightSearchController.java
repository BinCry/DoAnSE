package com.qlvmb.airticket.controller;

import com.qlvmb.airticket.domain.dto.FlightSearchResponse;
import com.qlvmb.airticket.service.DemoDataService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class FlightSearchController {

  private final DemoDataService demoDataService;

  public FlightSearchController(DemoDataService demoDataService) {
    this.demoDataService = demoDataService;
  }

  @GetMapping("/flights/search")
  public FlightSearchResponse searchFlights(
      @RequestParam(defaultValue = "SGN") String from,
      @RequestParam(defaultValue = "HAN") String to,
      @RequestParam(defaultValue = "round_trip") String tripType
  ) {
    return demoDataService.searchFlights(from, to, tripType);
  }
}
