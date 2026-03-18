package com.qlvmb.airticket.security;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Locale;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtTokenService jwtTokenService;

  public JwtAuthenticationFilter(JwtTokenService jwtTokenService) {
    this.jwtTokenService = jwtTokenService;
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain
  ) throws ServletException, IOException {
    String authorization = request.getHeader("Authorization");
    if (authorization == null || !authorization.startsWith("Bearer ")) {
      filterChain.doFilter(request, response);
      return;
    }

    String token = authorization.substring(7).trim();
    if (token.isEmpty()) {
      filterChain.doFilter(request, response);
      return;
    }

    try {
      JwtTokenService.AccessTokenPayload payload = jwtTokenService.parseAccessToken(token);
      List<SimpleGrantedAuthority> authorities = payload.roles().stream()
          .map(role -> new SimpleGrantedAuthority("ROLE_" + role.toUpperCase(Locale.ROOT)))
          .toList();
      AuthenticatedUser authenticatedUser = new AuthenticatedUser(
          payload.userId(),
          payload.email(),
          payload.displayName(),
          payload.roles()
      );
      UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
          authenticatedUser,
          null,
          authorities
      );
      SecurityContextHolder.getContext().setAuthentication(authentication);
    } catch (JwtException exception) {
      SecurityContextHolder.clearContext();
    }

    filterChain.doFilter(request, response);
  }
}
