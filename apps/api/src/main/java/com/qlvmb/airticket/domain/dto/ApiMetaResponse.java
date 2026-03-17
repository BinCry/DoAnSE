package com.qlvmb.airticket.domain.dto;

import java.time.OffsetDateTime;
import java.util.List;

public record ApiMetaResponse(
    String service,
    String title,
    List<String> activeProfiles,
    String javaVersion,
    String status,
    OffsetDateTime serverTime
) {
}
