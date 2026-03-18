package com.qlvmb.airticket.domain.dto;

import java.time.LocalDate;

public record MyPassengerResponse(
    Long id,
    String fullName,
    String passengerType,
    LocalDate dateOfBirth,
    String documentType,
    String documentNumber,
    boolean isPrimary
) {
}
