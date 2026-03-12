package com.qlvmb.airticket.domain.dto;

import java.util.List;

public record AuthSummaryResponse(
    List<RoleItem> roles,
    List<String> rules
) {

  public record RoleItem(
      String role,
      String label,
      List<String> permissions
  ) {
  }
}
