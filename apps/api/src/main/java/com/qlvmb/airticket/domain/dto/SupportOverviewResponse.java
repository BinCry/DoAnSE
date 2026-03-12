package com.qlvmb.airticket.domain.dto;

import java.util.List;

public record SupportOverviewResponse(
    List<TicketCard> tickets,
    List<String> faqPrompts,
    List<String> channels
) {

  public record TicketCard(
      String code,
      String subject,
      String status,
      String sla
  ) {
  }
}
