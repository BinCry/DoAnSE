package com.qlvmb.airticket.domain.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AuthPasswordResetRequest(
    @NotBlank @Email @Size(max = 160) String email
) {
}
