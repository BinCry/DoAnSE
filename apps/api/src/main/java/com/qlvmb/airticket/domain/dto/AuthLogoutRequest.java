package com.qlvmb.airticket.domain.dto;

import jakarta.validation.constraints.NotBlank;

public record AuthLogoutRequest(
    @NotBlank String refreshToken
) {
}
