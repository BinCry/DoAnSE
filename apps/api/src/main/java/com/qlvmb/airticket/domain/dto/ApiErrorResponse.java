package com.qlvmb.airticket.domain.dto;

import java.time.OffsetDateTime;
import java.util.Map;

public record ApiErrorResponse(
    int status,
    String message,
    Map<String, String> errors,
    OffsetDateTime timestamp
) {
}
