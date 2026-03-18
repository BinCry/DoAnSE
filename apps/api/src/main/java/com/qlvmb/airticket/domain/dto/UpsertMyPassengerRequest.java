package com.qlvmb.airticket.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record UpsertMyPassengerRequest(
    @NotBlank(message = "Họ tên hành khách không được để trống.")
    @Size(max = 160, message = "Họ tên hành khách không được vượt quá 160 ký tự.")
    String fullName,
    @NotBlank(message = "Loại hành khách không được để trống.")
    @Size(max = 32, message = "Loại hành khách không được vượt quá 32 ký tự.")
    String passengerType,
    @NotNull(message = "Ngày sinh không được để trống.")
    @PastOrPresent(message = "Ngày sinh không được là ngày trong tương lai.")
    LocalDate dateOfBirth,
    @NotBlank(message = "Loại giấy tờ không được để trống.")
    @Size(max = 40, message = "Loại giấy tờ không được vượt quá 40 ký tự.")
    String documentType,
    @NotBlank(message = "Số giấy tờ không được để trống.")
    @Size(max = 64, message = "Số giấy tờ không được vượt quá 64 ký tự.")
    String documentNumber,
    boolean isPrimary
) {
}
