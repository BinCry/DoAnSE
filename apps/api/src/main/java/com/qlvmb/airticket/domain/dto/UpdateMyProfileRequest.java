package com.qlvmb.airticket.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpdateMyProfileRequest(
    @NotBlank(message = "Tên hiển thị không được để trống.")
    @Size(max = 160, message = "Tên hiển thị không được vượt quá 160 ký tự.")
    String displayName,
    @Pattern(
        regexp = "^$|^[0-9+]{9,15}$",
        message = "Số điện thoại phải gồm 9 đến 15 chữ số hoặc dấu cộng."
    )
    String phone
) {
}
