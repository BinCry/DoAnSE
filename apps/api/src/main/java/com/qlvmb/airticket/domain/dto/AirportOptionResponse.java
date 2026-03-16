package com.qlvmb.airticket.domain.dto;

public record AirportOptionResponse(
    String code,
    String cityName,
    String airportName,
    String terminalLabel
) {
}
