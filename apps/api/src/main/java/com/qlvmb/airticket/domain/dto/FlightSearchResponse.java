package com.qlvmb.airticket.domain.dto;

import java.util.List;

public record FlightSearchResponse(
    String tripType,
    String from,
    String to,
    List<String> filters,
    List<FlightCard> flights,
    List<FareCard> fares,
    SearchCriteria criteria,
    List<FlightCard> outboundFlights,
    List<FlightCard> returnFlights
) {

  public record SearchCriteria(
      String from,
      String to,
      String departureDate,
      String returnDate,
      String tripType,
      String fareFamily,
      int adultCount,
      int childCount,
      int infantCount
  ) {
  }

  public record FlightCard(
      long inventoryId,
      long flightId,
      String code,
      String from,
      String to,
      String originCode,
      String destinationCode,
      String departureAt,
      String arrivalAt,
      String departureTime,
      String arrivalTime,
      String duration,
      String status,
      String fareFamily,
      long price,
      long seatsLeft
  ) {
  }

  public record FareCard(
      String fareFamily,
      String title,
      long price,
      List<String> perks
  ) {
  }
}
