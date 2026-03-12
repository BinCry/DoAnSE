package com.qlvmb.airticket.domain.dto;

import java.util.List;

public record FlightSearchResponse(
    String tripType,
    String from,
    String to,
    List<String> filters,
    List<FlightCard> results,
    List<FareCard> fareFamilies
) {

  public record FlightCard(
      String code,
      String departureTime,
      String arrivalTime,
      String duration,
      String status,
      String fareFamily,
      int price,
      int seatsLeft
  ) {
  }

  public record FareCard(
      String title,
      int price,
      List<String> perks
  ) {
  }
}
