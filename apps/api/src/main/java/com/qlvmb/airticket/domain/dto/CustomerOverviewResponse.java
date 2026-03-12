package com.qlvmb.airticket.domain.dto;

import java.util.List;

public record CustomerOverviewResponse(
    String customerName,
    String membershipTier,
    int pointBalance,
    List<String> upcomingTrips,
    List<String> notifications
) {
}
