package com.qlvmb.airticket.security;

import java.util.List;

public record AuthenticatedUser(
    Long userId,
    String email,
    String displayName,
    List<String> roles
) {
}
