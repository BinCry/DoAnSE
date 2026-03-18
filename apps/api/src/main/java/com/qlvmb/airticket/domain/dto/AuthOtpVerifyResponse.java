package com.qlvmb.airticket.domain.dto;

public record AuthOtpVerifyResponse(
    boolean verified,
    String message
) {
}
