package com.qlvmb.airticket.domain.dto;

import java.util.List;

public record BookingOverviewResponse(
    String bookingCode,
    String status,
    String holdExpiresAt,
    List<String> steps,
    List<AncillaryItem> ancillaries,
    List<String> paymentMethods
) {

  public record AncillaryItem(
      String code,
      String name,
      String description,
      int price
  ) {
  }
}
